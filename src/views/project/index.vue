<template>
  <div>
    <el-row>
      <div class="header">
        <i style="font-size: 24px" class="el-icon-setting"/>
        <span style="font-size: 20px">项目列表</span>
      </div>
    </el-row>
    <el-row style="margin: 20px">
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="Title" min-width="15px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Type" min-width="10px" align="center">
          <template slot-scope="{row}">
            <el-tag :type="row.type | typeFilter">
              {{ row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Dataset" min-width="15px" align="center">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.dataSetName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="CreateTime" min-width="15px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="EndTime" min-width="15px" align="center">
          <template slot-scope="scope">
            {{ scope.row.endTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column label="Progress" min-width="15px" align="center">
          <template slot-scope="scope">
            <el-progress :percentage= "scope.row.progress" :color="scope.row.progress | progressFilter"/>
          </template>
        </el-table-column>
        <el-table-column label="Status" class-name="status-col" min-width="10" align="center">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" min-width="30" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini">
              Edit
            </el-button>
            <el-button size="mini" type="success" @click="handlePublish(row)">
              Publish
            </el-button>
            <!--<el-button v-if="row.status=='published'" size="mini" type="success" @click="handleDetail(row)">-->
              <!--Detail-->
            <!--</el-button>-->
            <el-button size="mini" type="success" @click="handleTraining(row)">
              Training
            </el-button>
            <router-link :to="'/project/'+row.name+'/images'">
              <el-button v-if="row.status=='published'" size="mini">
                Images
              </el-button>
            </router-link>
            <router-link :to="'/project/'+row.name+'/tasks'">
              <el-button v-if="row.status=='published'" size="mini">
                Tasks
              </el-button>
            </router-link>
            <!--<el-button size="mini" type="danger" @click="handleDelete(row)">-->
              <!--Delete-->
            <!--</el-button>-->

          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-row>


    <el-dialog title="Publish Settings" :visible.sync="publishDlgVisible" >
      <el-form :model="publishRequest" label-width="180px">
        <el-form-item label="ProjectName">
          <el-input v-model="currentProject" style="width: 200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Strategy">
          <el-select v-model="publishRequest.strategy" placeholder="请选择">
            <el-option label="随机选择" value="random"></el-option>
            <el-option label="固定策略" value="fixed"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="NumberOfImages" v-if="publishRequest.strategy==='random'">
          <el-input v-model="publishRequest.total" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="MaxWorkerPerTask">
          <el-input v-model="publishRequest.maxWorkerPerTask" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="MaxIterationsPerTask">
          <el-input v-model="publishRequest.maxIterationsPerTask" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="Inference">
          <el-radio-group v-model="publishRequest.inference">
            <el-radio-button label="true"></el-radio-button>
            <el-radio-button label="false"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="publishDlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePublishRequest">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, publishProject, deleteProject } from '@/api/project'
import { training } from '@/api/detection'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  name: 'ProjectList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        // draft: 'new.vue',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    progressFilter(progress) {
      if (progress >= 0 && progress < 33) {
        return '#409EFF'
      } else if (progress >= 33 && progress < 66) {
        return '#93E3FB'
      } else if (progress >= 66 && progress <= 99) {
        return '#93FBBE'
      } else if (progress === 100) {
        return '#67C23A'
      }
    },
    typeFilter(type) {
      const typeMap = {
        Detection: 'success',
        MultiClassDetection: 'new.vue'
      }
      return typeMap[type]
    },
    parseTime: parseTime
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      publishDlgVisible: false,
      publishRequest: {
        strategy:'random',
        total: 0,
        inference: true,
        maxWorkerPerTask:1,
        maxIterationsPerTask:1
      },
      currentProject: null,
      currentDataSet: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.rows
        this.total = parseInt(response.data.total)
        this.listLoading = false
      })
    },
    handlePublish(row) {
      this.currentProject = row.name
      this.currentDataSet = row.dataSetName
      this.publishDlgVisible = true
    },

    handlePublishRequest() {
      publishProject(this.currentProject,  this.currentDataSet, this.publishRequest).then(response => {
        if (response.success) {
          // row.status = 'published'
          this.$message({
            message: '项目启动成功',
            type: 'success'
          })
          this.publishDlgVisible = false
        } else {
          this.$message({
            message: '项目启动失败',
            type: 'warning'
          })
          this.publishDlgVisible = false
        }
      })
    },
    handleDetail(row) {

    },
    handleTraining(row) {
      training(row.name, row.dataSetName).then(response => {
        if (response.success) {
          this.$message({
            message: '发送模型训练成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '发送模型训练失败',
            type: 'warning'
          })
        }
      })
    },
    handleDelete(row) {
      deleteProject(row.name).then(response => {
        if (response.success) {
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
          this.$message({
            message: '项目删除成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '项目删除失败',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .header {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
    background-color:  #fff;
    height: 60px;
    margin-top: 2px;
    padding: 18px;
    margin-bottom: 2px;
  }
</style>
