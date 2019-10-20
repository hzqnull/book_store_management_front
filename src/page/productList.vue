<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="ID">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="名称">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="价格">
                        <span>{{ props.row.price }}</span>
                      </el-form-item>
                      <!-- <el-form-item label="imgurl">
                        <span>{{ props.row.imgurl }}</span>
                      </el-form-item> -->
                      <el-form-item label="介绍">
                        <span>{{ props.row.description }}</span>
                      </el-form-item>
                      <el-form-item label="库存">
                        <span>{{ props.row.pnum }}</span>
                      </el-form-item>
                      <el-form-item label="分类">
                        <span>{{ props.row.category }}</span>
                      </el-form-item>
                      <!-- <el-form-item label="月销量">
                        <span>{{ props.row.month_sales }}</span>
                      </el-form-item> -->
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="名称"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="价格"
                  prop="price">
                </el-table-column>
                <el-table-column
                  label="库存"
                  prop="pnum">
                </el-table-column>
                <el-table-column label="操作" width="160">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改图书信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" label-width="100px">
                        <el-input v-model="selectTable.price" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="分类" label-width="100px">
                        <el-input v-model="selectTable.category" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="库存" label-width="100px">
                        <el-input v-model="selectTable.pnum" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍" label-width="100px">
                        <el-input v-model="selectTable.description"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="baseUrl + '/v1/addimg/food'"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <!-- <el-row style="overflow: auto; text-align: center;">
	                <el-table
				    :data="specs"
				    style="margin-bottom: 20px;"
				    :row-class-name="tableRowClassName">
					    <el-table-column
					      prop="specs"
					      label="规格">
					    </el-table-column>
					    <el-table-column
					      prop="packing_fee"
					      label="包装费">
					    </el-table-column>
					    <el-table-column
					      prop="price"
					      label="价格">
					    </el-table-column>
					    <el-table-column label="操作" >
					    <template slot-scope="scope">
					        <el-button
					          size="small"
					          type="danger"
					          @click="deleteSpecs(scope.$index)">删除</el-button>
					    </template>
					    </el-table-column>
					</el-table>
					<el-button type="primary" @click="specsFormVisible = true" style="margin-bottom: 10px;">添加规格</el-button>
				</el-row> -->
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateProduct">确 定</el-button>
              </div>
            </el-dialog>


            <!-- <el-dialog title="添加规格" v-model="specsFormVisible">
			  	<el-form :rules="specsFormrules" :model="specsForm">
				    <el-form-item label="规格" label-width="100px" prop="specs">
				     	<el-input v-model="specsForm.specs" auto-complete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="包装费" label-width="100px">
						<el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
					</el-form-item>
					<el-form-item label="价格" label-width="100px">
						<el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
					</el-form-item>
			  	</el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="specsFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addspecs">确 定</el-button>
			  </div>
			</el-dialog> -->
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getFoods, getFoodsCount, getMenu, updateFood, deleteFood, getResturantDetail, getMenuById} from '@/api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                restaurant_id: null,
                city: {},
                offset: 0,
                limit: 20,
                pageSize: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                menuOptions: [],
                selectMenu: {},
                selectIndex: null,
                specsForm: {
		          	specs: '',
		          	packing_fee: 0,
		          	price: 20,
		        },
                specsFormrules: {
		        	specs: [
						{ required: true, message: '请输入规格', trigger: 'blur' },
					],
		        },
		        specsFormVisible: false,
                expendRow: [],
            }
        },
        created(){
            //获取图书总条数
            this.$axios.get('/productCount')
            .then((response)=> {
                this.count = response.data.data;
            })
            .then((error)=> {
                console.log(error);
            });

            this.getProducts();


        	// this.restaurant_id = this.$route.query.restaurant_id;
            // this.initData();
        },
        computed: {
        	// specs: function (){
        	// 	let specs = [];
        	// 	if (this.selectTable.specfoods) {
	        // 		this.selectTable.specfoods.forEach(item => {
	        // 			specs.push({
	        // 				specs: item.name,
	        // 				packing_fee: item.packing_fee,
	        // 				price: item.price,
	        // 			})
	        // 		})
        	// 	}
        	// 	return specs
        	// }
        },
    	components: {
    		headTop,
    	},
        methods: {
            //分页获取图书
            getProducts() {
                this.$axios.get('/products/'+this.currentPage+'/'+this.pageSize)
                .then((response)=> {
                    const Products = response.data.data;
                    this.tableData = [];
                    Products.forEach((item, index) => {
                        const tableData = {};
                        tableData.name = item.name;
                        tableData.id = item.id;
                        tableData.description = item.description;
                        tableData.price = item.price;
                        tableData.category = item.category;
                        tableData.pnum = item.pnum;
                        // tableData.monly_sale = item.monlySale;
                        tableData.imgurl = item.imgurl;
                        this.tableData.push(tableData);
                    })
                })
                .catch((error)=> {
                    console.log(error);
                });
            },

            async initData(){
                try{
                    const countData = await getFoodsCount({restaurant_id: this.restaurant_id});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getFoods();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async getMenu(){
            	this.menuOptions = [];
                try{
                    const menu = await getMenu({restaurant_id: this.selectTable.restaurant_id, allMenu: true});
                    menu.forEach((item, index) => {
                        this.menuOptions.push({
                        	label: item.name,
                        	value: item.id,
                        	index,
                        })
                    })
                }catch(err){
                    console.log('获取食品种类失败', err);
                }
            },
            async getFoods(){
                const Foods = await getFoods({offset: this.offset, limit: this.limit, restaurant_id: this.restaurant_id});
                this.tableData = [];
                Foods.forEach((item, index) => {
                    const tableData = {};
                    tableData.name = item.name;
                    tableData.item_id = item.item_id;
                    tableData.description = item.description;
                    tableData.rating = item.rating;
                    tableData.month_sales = item.month_sales;
                    tableData.restaurant_id = item.restaurant_id;
                    tableData.category_id = item.category_id;
                    tableData.image_path = item.image_path;
                    tableData.specfoods = item.specfoods;
                    tableData.index = index;
                    this.tableData.push(tableData);
                })
            },
            tableRowClassName(row, index) {
		        if (index === 1) {
		        	return 'info-row';
		        } else if (index === 3) {
		        	return 'positive-row';
		        }
		        return '';
		    },
		    addspecs(){
				this.specs.push({...this.specsForm});
				this.specsForm.specs = '';
				this.specsForm.packing_fee = 0;
				this.specsForm.price = 20;
				this.specsFormVisible = false;
			},
			deleteSpecs(index){
				this.specs.splice(index, 1);
			},
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getProducts();
            },
            expand(row, status){
            	if (status) {
            		this.getSelectItemData(row)
            	}else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },
            handleEdit(row) {
            	this.getSelectItemData(row, 'edit')
                this.dialogFormVisible = true;
            },
            async getSelectItemData(row, type){
                // const name = row.name;
            	// const restaurant = await getResturantDetail(row.restaurant_id);
            	// const category = await getMenuById(row.category_id)
                // this.selectTable = {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, category_name: category.name}};
                // this.selectMenu = {label: category.name, value: row.category_id}
                // this.tableData.splice(row.index, 1, {...this.selectTable});
                // this.$nextTick(() => {
                //     this.expendRow.push(row.index);
                // })
                // if (type == 'edit' && this.restaurant_id != row.restaurant_id) {
                // 	this.getMenu();
                // }
                
                this.selectTable.id = row.id;
                this.selectTable.name = row.name;
                this.selectTable.price = row.price;
                this.selectTable.description = row.description;
                this.selectTable.category = row.category;
                this.selectTable.pnum = row.pnum;
                this.selectTable.imgurl = row.imgurl;
            },
            handleSelect(index){
            	this.selectIndex = index;
            	this.selectMenu = this.menuOptions[index];
            },
            async handleDelete(index, row) {
                this.$confirm("确定删除 "+row.name+" ?", "警告", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=> {
                    this.$axios.delete('/product/'+row.id)
                    .then((response)=> {
                        this.$message( {
                            type: 'success',
                            message: '删除图书成功'
                        })
                        //获取图书总条数
                        this.$axios.get('/productCount')
                        .then((response)=> {
                            this.count = response.data.data;
                        })
                        .then((error)=> {
                            console.log(error);
                        });
                        this.getProducts();
                    })
                    .catch((error)=> {
                        this.$message( {
                            type: 'error',
                            message: '删除失败'
                        })
                    })
                }).catch(()=> {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                });



                // try{
                //     const res = await deleteFood(row.item_id);
                //     if (res.status == 1) {
                //         this.$message({
                //             type: 'success',
                //             message: '删除食品成功'
                //         });
                //         this.tableData.splice(index, 1);
                //     }else{
                //         throw new Error(res.message)
                //     }
                // }catch(err){
                //     this.$message({
                //         type: 'error',
                //         message: err.message
                //     });
                //     console.log('删除食品失败')
                // }
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.image_path = res.image_path;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            async updateFood(){
                this.dialogFormVisible = false;
                try{
                	const subData = {new_category_id: this.selectMenu.value, specs: this.specs};
                	const postData = {...this.selectTable, ...subData};
                    const res = await updateFood(postData)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新食品信息成功'
                        });
                        this.getFoods();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('更新餐馆信息失败', err);
                }
            },
            async updateProduct() {
                this.dialogFormVisible = false;
                this.$axios.put('/product', this.selectTable)
                .then((response)=> {
                    this.$message({
                        type: 'success',
                        message: '更新图书信息成功'
                    });
                    this.getProducts();
                })
                .catch((error)=> {
                    this.$message({
                        type: 'error',
                        message: '更新失败'
                    });
                });
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>