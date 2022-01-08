/*
 * @Author: lzm
 * @Date: 2021-11-24 17:21:59
 * @Notes: 使用built命令快速得到一些常用的snippets,右击py文件可以preview代码
 * @LastEditTime: 2021-11-24 18:19:48
 */

//保存当前的this
// var _this = this;

new Vue({
    //
    el: '#app',
    data() {
        return {
            infos: [
                {
                    img: 'img/img1.png',
                    name: '张家界天门山',
                    cont: '这就是我，不一样的烟火',
                    price: 299,
                    count: 1
                },
                {
                    img: 'img/img2.png',
                    name: '张家界武陵源',
                    cont: '不到武陵源，枉到张家界',
                    price: 279,
                    count: 1
                }
            ],
            dialogFormVisible: false,
            form: {
                name: '',
                namec: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
            // result: 0,
            hotelList: [
                { label: '张家界华天大酒店', value: 129 },
                { label: '张家界韦斯特大酒店', value: 159 },
            ],
            hotelcList: [
                { label: '普通单人房', value: 1 },
                { label: '普通双人房', value: 2 },
                { label: '豪华单间', value: 3 },
                { label: '豪华双人房', value: 4 },
                { label: '经济大床房(3-5)', value: 5 },
                { label: '豪华大套房(3-5)', value: 6 },
            ],
            dayList: [
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '5', value: 5 },
                { label: '7', value: 7 },
            ],
            value: '',
            // 选中的选项
            item: {},
            item1: {},
            itemc: {},
            fname: "",
            fprice: "",
            fcount: "",
            iname: 0,
            janem: '',
            rules: {
                name: [
                    { required: true, message: '请选择酒店', trigger: 'blur' },
                    // { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                namec: [
                    { required: true, message: '请选择酒店类型', trigger: 'blur' },
                ],
                region: [
                    { required: true, message: '请选择居住天数', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                // date2: [
                //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                // ],
                // type: [
                //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                // ],
                resource: [
                    { required: true, message: '请选择购买形式', trigger: 'change' }
                ],
                // desc: [
                //     { required: true, message: '请填写活动形式', trigger: 'blur' }
                // ]
            }
        }
    },
    methods: {
        onSubmit() {
            //ajax发送成功的是响应的时候也需要要关闭弹出层
            this.dialogFormVisible = false
        },
        hotelValue(value) {
            this.item = this.hotelList.find((item) => {
                console.log(this.form.name);
                console.log(this.itemc.value);
                console.log(this.iname);
                if (this.iname != 0) {
                    this.hotelcValue(this.iname)
                }
                return item.value === value
            });
            // console.log(this.item);
            this.jame = this.item.label;
            //由于没有双向绑定jame，并且由于函数作用域问题导致无法在全局使用，暂不影响
            console.log(this.jame);

        },
        hotelcValue(value) {
            console.log(this.form.name);
            console.log(this.item.value);
            this.itemc = this.hotelcList.find((itemc) => {
                // console.log(value);
                itemc.value = value
                this.iname = itemc.value
                if (itemc.value === 1) {
                    // console.log(itemc.value);
                    return itemc.value = this.form.name - 20;
                }
                if (itemc.value === 2) {
                    return itemc.value = this.form.name + 30;
                }
                if (itemc.value === 3) {
                    return itemc.value = this.form.name;
                }
                if (itemc.value === 4) {
                    return itemc.value = this.form.name + 60;
                }
                if (itemc.value === 5) {
                    return itemc.value = this.form.name + 100;
                }
                if (itemc.value === 6) {
                    return itemc.value = this.form.name + 160;
                }
                return itemc.value = value
            })
        },
        dayValue(value) {
            this.item1 = this.dayList.find((item1) => {
                return item1.value === value
            })
        },
        getPrice() {
            console.log(this.form.name);
            console.log(this.form.region);
            this.totalPrice = this.itemc.value * this.form.region + this.info.price * this.info.count
            if (this.totalPrice > 1000) {
                return this.totalPrice = this.totalPrice - 100
            }
            if (this.totalPrice > 2000) {
                return this.totalPrice = this.totalPrice - 200
            }
            if (this.totalPrice > 3000) {
                return this.totalPrice = this.totalPrice - 500
            }
            return this.totalPrice
        },
        dec() {
            // console.log('dec',index);
            this.fcount--
        },
        add() {
            // console.log('add',index);
            this.fcount++
        },
        submitForm(formName) {
            console.log(formName);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(this.item.label);
                    if (this.form.resource == "否") {
                        alert('购买成功！, 你选择的套餐是：' + this.fname + '景点');
                    }
                    else {
                        alert('购买成功！, 你选择的套餐是：' + this.fname + '景点和' + this.item.label + '酒店');
                    }
                    // return this.dialogFormVisible = false
                    this.dialogFormVisible = false;
                    // 点击取消 数据重置
                    this.$refs[formName].resetFields();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        changeValue(name, price, count) {
            this.dialogFormVisible = true
            this.fname = name
            this.fprice = price
            this.fcount = count
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        // 对话框取消事件
        closeFrom(formName) {
            this.dialogFormVisible = false;
            // 点击取消 数据重置
            this.$refs[formName].resetFields();
        }
    },
    computed: {
        totalPrice() {
            let result = 0;
            // console.log(this.form.name);
            // console.log(this.form.region);
            // result = this.info.price * this.info.count
            if (this.form.resource === "是") {
                result = this.itemc.value * this.form.region + this.fprice * this.fcount
            }
            else {
                result = this.fprice * this.fcount
            }
            if (result > 1200) {
                return result = result - 100
            }
            if (result > 2000) {
                return result = result - 300
            }
            if (result > 3000) {
                return result = result - 500
            }
            else {
                return result
            }
            // return result    
        }
    }
});
