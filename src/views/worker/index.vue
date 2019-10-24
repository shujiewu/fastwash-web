<template>
  <div>
    <el-row>
      <div class="header">
        <i style="font-size: 24px" class="el-icon-setting"/>
        <span style="font-size: 20px">项目选择</span>
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
        <el-table-column label="ProjectName" min-width="15px" align="center">
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
        <el-table-column label="DataSet" min-width="15px" align="center">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.dataSetName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="CreateTime" min-width="15px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="Progress" min-width="15px" align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<el-progress :percentage= "scope.row.progress" :color="scope.row.progress | progressFilter"/>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="Class" class-name="status-col" min-width="10" align="center">
          <template slot-scope="{row}">
            <el-select v-model="row.selectClass" clearable placeholder="请选择标注类别">
              <el-option
                v-for="item in row.classification"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" min-width="10" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <router-link :to="{path:'/detection/annotation/'+ row.name, query:{dataset:row.dataSetName, classId: row.selectClass===''?0:row.selectClass}}">
              <el-button v-if="row.status=='published'" size="mini" type="success">
                开始标注
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-row>
  </div>
</template>

<script>
import { fetchList, publishProject, deleteProject } from '@/api/project'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  name: 'ProjectList',
  components: { Pagination },
  filters: {
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
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id',
        status: 'published'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        response.data.rows.forEach(row=>{
          row.selectClass = ''
        })
        this.list = response.data.rows
        this.total = parseInt(response.data.total)
        this.listLoading = false
      })
    },
    selectChanged(value) {
      console.log(value)
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
