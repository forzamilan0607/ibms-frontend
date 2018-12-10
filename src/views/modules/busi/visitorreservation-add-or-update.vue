<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="访客手机号" prop="phone">
      <el-input v-model="dataForm.phone" placeholder="访客手机号"></el-input>
    </el-form-item>
    <el-form-item label="访客照片" prop="photoUrl">
      <el-input v-model="dataForm.photoUrl" placeholder="访客照片"></el-input>
    </el-form-item>
    <el-form-item label="访客id" prop="visitorId">
      <el-input v-model="dataForm.visitorId" placeholder="访客id"></el-input>
    </el-form-item>
    <el-form-item label="受访者id" prop="staffId">
      <el-input v-model="dataForm.staffId" placeholder="受访者id"></el-input>
    </el-form-item>
    <el-form-item label="订单状态" prop="status">
      <el-input v-model="dataForm.status" placeholder="订单状态"></el-input>
    </el-form-item>
    <el-form-item label="预约开始时间" prop="appointStartTime">
      <el-input v-model="dataForm.appointStartTime" placeholder="预约开始时间"></el-input>
    </el-form-item>
    <el-form-item label="预约结束时间" prop="appointEndTime">
      <el-input v-model="dataForm.appointEndTime" placeholder="预约结束时间"></el-input>
    </el-form-item>
    <el-form-item label="实际开始时间" prop="actStartTime">
      <el-input v-model="dataForm.actStartTime" placeholder="实际开始时间"></el-input>
    </el-form-item>
    <el-form-item label="实际结束时间" prop="actEndTime">
      <el-input v-model="dataForm.actEndTime" placeholder="实际结束时间"></el-input>
    </el-form-item>
    <el-form-item label="预约单类型  1  在线预约    2 线下预约  默认1  " prop="type">
      <el-input v-model="dataForm.type" placeholder="预约单类型  1  在线预约    2 线下预约  默认1  "></el-input>
    </el-form-item>
    <el-form-item label="备注(来访目的)" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注(来访目的)"></el-input>
    </el-form-item>
    <el-form-item label="同行人数" prop="companions">
      <el-input v-model="dataForm.companions" placeholder="同行人数"></el-input>
    </el-form-item>
    <el-form-item label="扩展字段1" prop="ext1">
      <el-input v-model="dataForm.ext1" placeholder="扩展字段1"></el-input>
    </el-form-item>
    <el-form-item label="扩展字段2" prop="ext2">
      <el-input v-model="dataForm.ext2" placeholder="扩展字段2"></el-input>
    </el-form-item>
    <el-form-item label="扩展字段3" prop="ext3">
      <el-input v-model="dataForm.ext3" placeholder="扩展字段3"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="创建人id" prop="createUserId">
      <el-input v-model="dataForm.createUserId" placeholder="创建人id"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="更新人id" prop="updateUserId">
      <el-input v-model="dataForm.updateUserId" placeholder="更新人id"></el-input>
    </el-form-item>
    <el-form-item label="访客物理卡id" prop="physicalCardId">
      <el-input v-model="dataForm.physicalCardId" placeholder="访客物理卡id"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          phone: '',
          photoUrl: '',
          visitorId: '',
          staffId: '',
          status: '',
          appointStartTime: '',
          appointEndTime: '',
          actStartTime: '',
          actEndTime: '',
          type: '',
          remark: '',
          companions: '',
          ext1: '',
          ext2: '',
          ext3: '',
          createTime: '',
          createUserId: '',
          updateTime: '',
          updateUserId: '',
          physicalCardId: ''
        },
        dataRule: {
          phone: [
            { required: true, message: '访客手机号不能为空', trigger: 'blur' }
          ],
          photoUrl: [
            { required: true, message: '访客照片不能为空', trigger: 'blur' }
          ],
          visitorId: [
            { required: true, message: '访客id不能为空', trigger: 'blur' }
          ],
          staffId: [
            { required: true, message: '受访者id不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '订单状态不能为空', trigger: 'blur' }
          ],
          appointStartTime: [
            { required: true, message: '预约开始时间不能为空', trigger: 'blur' }
          ],
          appointEndTime: [
            { required: true, message: '预约结束时间不能为空', trigger: 'blur' }
          ],
          actStartTime: [
            { required: true, message: '实际开始时间不能为空', trigger: 'blur' }
          ],
          actEndTime: [
            { required: true, message: '实际结束时间不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '预约单类型  1  在线预约    2 线下预约  默认1  不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注(来访目的)不能为空', trigger: 'blur' }
          ],
          companions: [
            { required: true, message: '同行人数不能为空', trigger: 'blur' }
          ],
          ext1: [
            { required: true, message: '扩展字段1不能为空', trigger: 'blur' }
          ],
          ext2: [
            { required: true, message: '扩展字段2不能为空', trigger: 'blur' }
          ],
          ext3: [
            { required: true, message: '扩展字段3不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: true, message: '创建人id不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          updateUserId: [
            { required: true, message: '更新人id不能为空', trigger: 'blur' }
          ],
          physicalCardId: [
            { required: true, message: '访客物理卡id不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/busi/visitorreservation/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.phone = data.visitorreservation.phone
                this.dataForm.photoUrl = data.visitorreservation.photoUrl
                this.dataForm.visitorId = data.visitorreservation.visitorId
                this.dataForm.staffId = data.visitorreservation.staffId
                this.dataForm.status = data.visitorreservation.status
                this.dataForm.appointStartTime = data.visitorreservation.appointStartTime
                this.dataForm.appointEndTime = data.visitorreservation.appointEndTime
                this.dataForm.actStartTime = data.visitorreservation.actStartTime
                this.dataForm.actEndTime = data.visitorreservation.actEndTime
                this.dataForm.type = data.visitorreservation.type
                this.dataForm.remark = data.visitorreservation.remark
                this.dataForm.companions = data.visitorreservation.companions
                this.dataForm.ext1 = data.visitorreservation.ext1
                this.dataForm.ext2 = data.visitorreservation.ext2
                this.dataForm.ext3 = data.visitorreservation.ext3
                this.dataForm.createTime = data.visitorreservation.createTime
                this.dataForm.createUserId = data.visitorreservation.createUserId
                this.dataForm.updateTime = data.visitorreservation.updateTime
                this.dataForm.updateUserId = data.visitorreservation.updateUserId
                this.dataForm.physicalCardId = data.visitorreservation.physicalCardId
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/busi/visitorreservation/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'phone': this.dataForm.phone,
                'photoUrl': this.dataForm.photoUrl,
                'visitorId': this.dataForm.visitorId,
                'staffId': this.dataForm.staffId,
                'status': this.dataForm.status,
                'appointStartTime': this.dataForm.appointStartTime,
                'appointEndTime': this.dataForm.appointEndTime,
                'actStartTime': this.dataForm.actStartTime,
                'actEndTime': this.dataForm.actEndTime,
                'type': this.dataForm.type,
                'remark': this.dataForm.remark,
                'companions': this.dataForm.companions,
                'ext1': this.dataForm.ext1,
                'ext2': this.dataForm.ext2,
                'ext3': this.dataForm.ext3,
                'createTime': this.dataForm.createTime,
                'createUserId': this.dataForm.createUserId,
                'updateTime': this.dataForm.updateTime,
                'updateUserId': this.dataForm.updateUserId,
                'physicalCardId': this.dataForm.physicalCardId
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
