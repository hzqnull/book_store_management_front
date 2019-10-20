<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="registe_time"
                  label="注册日期"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="username"
                  label="用户昵称"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="email"
                  label="邮箱"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="telephone"
                  label="电话号码"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="introduce"
                  label="介绍">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getUserList, getUserCount} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [{
                  registe_time: '2019-05-02',
                  username: '老王',
                  email: '1234566@qq.com',
                  telephone: '13800138000',
                  introduce: 'hello,我是老王'
                }],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                pageSize: 50,
                pageCount:1
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            //获取总条数
            this.$axios.get('/userCount')
            .then((response)=> {
                this.count = response.data.data;
            })
            .catch((error)=> {
                console.log(error);
            })

            this.initData();
        },
        methods: {
            async initData(){
                this.getData(1);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData(this.currentPage);
            },
            //从服务端获取数据
            getData(val) {
                this.$axios.get('/usersByPaging/'+val+'/'+this.pageSize)
                .then((response)=> {
                    console.log(response);
                    if (response.data.status=='success') {
                        const Users = response.data.data;
                        this.tableData = [];
                        Users.forEach(item => {
                            const tableData = {};
                            tableData.username = item.username;
                            tableData.registe_time = item.registTime;
                            tableData.email = item.email;
                            tableData.telephone = item.telephone;
                            tableData.introduce = item.introduce;
                            this.tableData.push(tableData);
                        })
                    } else {
                        console.log(response);
                    }
                })
                .catch((error)=> {
                    console.log(error);
                })
            },
            async getUsers(){
                // const Users = await getUserList({offset: this.offset, limit: this.limit});
                this.$axios.get('/users')
				.then((response)=> {
					if (response.data.status!='success') {
						console.log(response);
					} else {
						console.log(response);
					}
				})
				.catch((error)=> {
					console.log(error);
				});
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
