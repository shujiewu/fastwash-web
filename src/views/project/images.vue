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
      <el-table-column label="Name" min-width="15px" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.imageId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Size" min-width="10px" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ [row.height,row.width] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Dataset" min-width="15px" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.dataSetName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="GroundTruth" class-name="status-col" min-width="10" align="center">
        <template slot-scope="{row}">
          <el-tag>
            {{ row.hasGroundTruth }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" min-width="10" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="InferenceTime" class-name="status-col" min-width="10" align="center">
        <template slot-scope="{row}">
          {{ row.inferenceTime }}
        </template>
      </el-table-column>
      <el-table-column label="LastUpdateTime" class-name="status-col" min-width="10" align="center">
        <template slot-scope="{row}">
          <span>{{ Number(row.lastUpdateTime)/1000 | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" min-width="30" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--<router-link :to="'/detection/annotation/'+ projectName + '/' + scope.row.dataset + '/'+ scope.row.file_name">-->
          <router-link v-if="scope.row.status=='unannotated'" :to="{path:'/detection/annotation/'+ projectName, query:{dataset:scope.row.dataSetName , imageId:scope.row.imageId, action: 'annotate' }}" >
            <el-button type="primary" size="mini">
              Annotate
            </el-button>
          </router-link>
          <router-link :to="{path:'/detection/annotation/'+ projectName, query:{dataset:scope.row.dataSetName , imageId:scope.row.imageId,action: 'inference' }}" >
            <el-button type="success" size="mini">
              Inference
            </el-button>
          </router-link>
          <router-link v-if="scope.row.hasGroundTruth==true" :to="{path:'/detection/annotation/'+ projectName, query:{ dataset:scope.row.dataSetName , imageId:scope.row.imageId, action: 'groundtruth'}}" >
            <el-button type="primary" size="mini">
              GroudTruth
            </el-button>
          </router-link>
          <router-link v-if="scope.row.status!='unannotated' || scope.row.lastUpdateTime!=null || scope.row.inferenceTime!=null" :to="{path:'/detection/annotation/'+ projectName, query:{dataset:scope.row.dataSetName , imageId:scope.row.imageId, action: 'improve' }}" >
            <el-button type="success" size="mini">
              Improve
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchImageList } from '@/api/project'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  name: 'ProjectList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'new.vue',
        deleted: 'danger'
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
      fetchImageList(this.projectName, this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = parseInt(response.data.total)
        this.listLoading = false
      })
    }
  }
}
</script>
