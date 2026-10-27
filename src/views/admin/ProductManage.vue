<template>
  <div class="manage-page">
    <div class="page-header">
      <div>
        <h2>商品管理</h2>
        <span class="page-desc">管理商城商品信息</span>
      </div>
      <el-button type="primary" @click="openDialog(null)" round>+ 新增商品</el-button>
    </div>

    <el-table :data="products" border stripe style="width: 100%" empty-text="暂无商品数据">
      <el-table-column prop="id" label="ID" width="60" align="center" />
      <el-table-column label="图片" width="80" align="center">
        <template #default="{ row }">
          <div class="table-img-wrapper">
            <img :src="row.image" class="table-img" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" min-width="160" />
      <el-table-column prop="price" label="价格" width="100">
        <template #default="{ row }">¥{{ row.price }}</template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" width="80" align="center" />
      <el-table-column label="操作" width="160" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" plain @click="openDialog(row)">编辑</el-button>
          <el-button type="danger" size="small" plain @click="deleteProduct(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px" destroy-on-close>
      <el-form :model="form" label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入商品名称" clearable />
        </el-form-item>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="价格">
              <el-input-number v-model="form.price" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库存">
              <el-input-number v-model="form.stock" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="分类">
          <el-select v-model="form.categoryId" placeholder="请选择分类" clearable style="width: 100%">
            <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="图片">
          <el-input v-model="form.image" placeholder="请输入图片链接" clearable />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description" placeholder="请输入商品描述" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProduct">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const products = ref([])
const categories = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref({ id: null, name: '', price: 0, stock: 0, categoryId: null, image: '', description: '' })
let editMode = false

const loadData = () => {
  products.value = JSON.parse(localStorage.getItem('products') || '[]')
  categories.value = JSON.parse(localStorage.getItem('categories') || '[]')
}
const openDialog = (row) => {
  if (row) {
    editMode = true
    dialogTitle.value = '编辑商品'
    form.value = { ...row }
  } else {
    editMode = false
    dialogTitle.value = '新增商品'
    form.value = { id: null, name: '', price: 0, stock: 0, categoryId: null, image: '', description: '' }
  }
  dialogVisible.value = true
}
const saveProduct = () => {
  if (!form.value.name.trim()) {
    ElMessage.warning('请输入商品名称')
    return
  }
  let list = JSON.parse(localStorage.getItem('products') || '[]')
  if (editMode) {
    const index = list.findIndex(p => p.id === form.value.id)
    if (index !== -1) list[index] = { ...form.value }
    ElMessage.success('商品已更新')
  } else {
    form.value.id = Date.now()
    list.push({ ...form.value })
    ElMessage.success('商品已添加')
  }
  localStorage.setItem('products', JSON.stringify(list))
  loadData()
  dialogVisible.value = false
}
const deleteProduct = (id) => {
  ElMessageBox.confirm('确定删除该商品吗？删除后无法恢复。', '确认删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let list = JSON.parse(localStorage.getItem('products') || '[]')
    list = list.filter(p => p.id !== id)
    localStorage.setItem('products', JSON.stringify(list))
    loadData()
    ElMessage.success('商品已删除')
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
.table-img-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f8fa;
  border-radius: 4px;
}
.table-img { width: 100%; height: 100%; object-fit: contain; }
</style>