<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ImageId" min-width="10" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.imageId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ClassId" min-width="10" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.classId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Iterations" min-width="10" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.iterations }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Dataset" min-width="15px" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.dataSetName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Status" class-name="status-col" min-width="15px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="LastUpdateTime" class-name="status-col" min-width="10" align="center">
        <template slot-scope="{row}">
          <span>{{ Number(row.lastUpdateTime)/1000 | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" min-width="10" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--<router-link :to="'/detection/annotation/'+ projectName + '/' + scope.row.dataset + '/'+ scope.row.file_name">-->
          <router-link :to="{path:'/detection/annotation/'+ projectName, query:{dataset:scope.row.dataSetName, imageId: scope.row.imageId, classId: scope.row.classId}}" >
            <el-button type="primary" size="mini">
              Annotate
            </el-button>
          </router-link>
          <el-button type="success" size="mini" @click="machineInference(scope.row)">
            Inference
          </el-button>
          <!--<router-link :to="{path:'/detection/annotation/'+ projectName, query:{dataset:scope.row.dataSetName , imageId:scope.row.imageId,action: 'inference' }}" >-->
          <!--</router-link>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchTaskList } from '@/api/project'
import { inference } from '@/api/detection'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  name: 'Tasks',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        TASK_STATUS_UNANNOTATED: 'info',
        TASK_STATUS_MACHINE_ANNOTATED: '',
        TASK_STATUS_CROWD_ANNOTATED: 'danger',
        TASK_STATUS_CROWD_RUNTIME: 'warning',
        TASK_STATUS_COMPLETED: 'success'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      const typeMap = {
        Detection: 'success',
        Video: 'new.vue'
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
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      projectName: ''
    }
  },
  created() {
    this.projectName = this.$route.params && this.$route.params.projectName
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchTaskList(this.projectName, this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = parseInt(response.data.total)
        this.listLoading = false
      })
    },
    machineInference(row){
      var imageList = [row.imageId]
      inference(this.projectName, row.dataSetName, imageList).then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '模型推断请求成功',
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '模型推断请求失败'
          })
        }
      })
    }
  }
}
</script>
