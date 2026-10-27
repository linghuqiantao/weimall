<template>
  <div class="manage-page">
    <div class="page-header">
      <div>
        <h2>分类管理</h2>
        <span class="page-desc">管理商品分类信息</span>
      </div>
      <el-button type="primary" @click="openAddDialog" round>+ 新增分类</el-button>
    </div>

    <el-table :data="categories" border stripe style="width: 100%" empty-text="暂无分类数据">
      <el-table-column prop="id" label="ID" width="80" align="center" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="icon" label="图标" width="120">
        <template #default="{ row }">
          <span style="font-size: 24px">{{ row.icon }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" plain @click="editCategory(row)">编辑</el-button>
          <el-button type="danger" size="small" plain @click="deleteCategory(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="editMode ? '编辑分类' : '新增分类'" width="400px" destroy-on-close>
      <el-form :model="form" label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入分类名称" clearable />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" placeholder="请输入图标（如 📚）" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveCategory">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const categories = ref([])
const dialogVisible = ref(false)
const form = ref({ id: null, name: '', icon: '' })
let editMode = false

const loadData = () => {
  categories.value = JSON.parse(localStorage.getItem('categories') || '[]')
}
const openAddDialog = () => {
  editMode = false
  form.value = { id: null, name: '', icon: '' }
  dialogVisible.value = true
}
const saveCategory = () => {
  if (!form.value.name.trim()) {
    ElMessage.warning('请输入分类名称')
    return
  }
  let list = JSON.parse(localStorage.getItem('categories') || '[]')
  if (editMode) {
    const index = list.findIndex(c => c.id === form.value.id)
    if (index !== -1) list[index] = { ...form.value }
    ElMessage.success('分类已更新')
  } else {
    const newCat = { ...form.value, id: Date.now() }
    list.push(newCat)
    ElMessage.success('分类已添加')
  }
  localStorage.setItem('categories', JSON.stringify(list))
  loadData()
  dialogVisible.value = false
}
const editCategory = (row) => {
  editMode = true
  form.value = { ...row }
  dialogVisible.value = true
}
const deleteCategory = (id) => {
  ElMessageBox.confirm('确定删除该分类吗？删除后无法恢复。', '确认删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let list = JSON.parse(localStorage.getItem('categories') || '[]')
    list = list.filter(c => c.id !== id)
    localStorage.setItem('categories', JSON.stringify(list))
    loadData()
    ElMessage.success('分类已删除')
  }).catch(() => {})
}
onMounted(loadData)
</script>

<style scoped>
.manage-page { padding: 20px; }
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.page-header h2 { font-size: 20px; color: #303133; margin: 0 0 4px; }
.page-desc { font-size: 13px; color: #909399; }
</style>