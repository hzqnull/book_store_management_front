<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
  				<header class="form_header">添加图书</header>
	  			<el-form :model="productForm" :rules="productRules" ref="productForm" label-width="110px" class="form">
					<el-form-item label="名称" prop="name">
						<el-input v-model="productForm.name"></el-input>
					</el-form-item>
					<el-form-item label="价格" prop="price">
						<el-input v-model="productForm.price" type="number"></el-input>
					</el-form-item>
					<el-form-item label="分类" prop="category">
						<el-input v-model="productForm.category"></el-input>
					</el-form-item>
					<el-form-item label="库存" prop="pnum">
						<el-input v-model="productForm.pnum" type="number"></el-input>
					</el-form-item>
					<el-form-item label="描述" prop="description">
						<el-input v-model="productForm.description"></el-input>
					</el-form-item>
					<!--图片-->
					<!-- <el-form-item label="上传图片">
						<el-upload
							class="avatar-uploader">
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item> -->
					<el-form-item>
						<el-button type="primary" @click="addProduct()">确认添加图书</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
		</el-row>
        
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'

    export default {
    	data(){
    		return {
    			
    			productForm: {
    				name: '',
    				price: '',
    				category: '',
    				pnum: 0,
					imgurl: '',
					description: '',
    			},
    			productRules: {
    				name: [
						{ required: true, message: '请输入名称', trigger: 'change' },
					],
					price: [
						{ required: true, message: '价格只能是数字', trigger: 'change' },
					],
					category: [
						{ required: true, message: '请输入分类', trigger: 'change' },
					],
					pnum: [
						{ required: true, message: '请输入库存量', trigger: 'change' },
					],
					description: [
						{ required: true, message: '请输入描述', trigger: 'change' },
					]
    			},
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
    		
    		
    	},
    	methods: {
			async addProduct() {
				this.$refs.productForm.validate((valid) => {
					if (valid) {
						this.$axios.post('/product',this.productForm)
						.then((response)=> {
							this.$message({
								type: 'success',
								message: '添加成功'
							});
							// this.productForm = {};
						})
						.catch((error)=> {
							this.$message({
								type: 'error',
								message: '添加失败'
							})
						});
					} else {
						this.$message({
							type: 'error',
							message: '信息不完整'
						})
						return false;
					}
				})
			},
			

			uploadImg(res, file) {
				if (res.status == 1) {
					this.foodForm.image_path = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			beforeImgUpload(file) {
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
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.food_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
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
	.cell{
		text-align: center;
	}
</style>
