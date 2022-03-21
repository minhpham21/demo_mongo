const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const Schema = mongoose.Schema
/*
    user:
        ( owner, super_admin, quan_tri_vien )       => 1
        phu_trach_khu_vuc                           => 2
        theo_khu_vuc_vs_thiet_bi                    => 3
*/
async function m1() {
    // ---------------------- connect db ----------------------
    await mongoose.connect('mongodb://127.0.0.1:27017/db_demo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })


    // ----------------------- USER -----------------------
    const userSchema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/
        },
        role: {
            type: Number,
            required: true
        },
        area:[
            {
                type: Schema.Types.ObjectId,
                ref: 'area',
            }
        ],
        equipment: [
            {
                type: Schema.Types.ObjectId,
                
                ref: 'equipment'
            }
        ]
    })
    const User = mongoose.model('users', userSchema)


    // ----------------------- AREA -----------------------
    const areaSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        equipments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'equipment'
            }
        ]
    })
    const Area = mongoose.model('areas', areaSchema)


    // ----------------------- EQUIPMENT -----------------------
    const equipmentSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        }
    })
    const Equipment = mongoose.model('equipments', equipmentSchema)


    // ----------------------- FACE EQUIPMENT -----------------------

    const faceEquipment_1 = new Equipment({name: 'cam_1'})
    const faceEquipment_2 = new Equipment({name: 'cam_2'})
    const faceEquipment_3 = new Equipment({name: 'cam_3'})
    const faceEquipment_4 = new Equipment({name: 'iot_1'})
    const faceEquipment_5 = new Equipment({name: 'iot_2'})
    const faceEquipment_6 = new Equipment({name: 'iot_3'})

    await faceEquipment_1.save( function (err, data) {
        if (err) console.log(err)
        console.log(data)
    })
    await faceEquipment_2.save()
    await faceEquipment_3.save()
    await faceEquipment_4.save()
    await faceEquipment_5.save()
    await faceEquipment_6.save()


    // ----------------------- FACE AREA -----------------------
    const findEquipment_1 = await Equipment.findOne({name: 'cam_1'})
    const findEquipment_2 = await Equipment.findOne({name: 'cam_2'})
    const findEquipment_3 = await Equipment.findOne({name: 'cam_3'})
    const findEquipment_4 = await Equipment.findOne({name: 'iot_1'})
    const findEquipment_5 = await Equipment.findOne({name: 'iot_2'})
    const findEquipment_6 = await Equipment.findOne({name: 'iot_3'})

    const faceArea_1 = new Area({
        name: 'A',
        equipments:[
            findEquipment_1._id,
            findEquipment_4._id  
        ] 
    })
    const faceArea_2 = new Area({
        name: 'B',
        equipments:[
            findEquipment_2._id,
            findEquipment_5._id  
        ]
    })
    const faceArea_3 = new Area({
        name: 'C',
        equipments:[
            findEquipment_3._id,
            findEquipment_6._id  
        ] 
    })

    await faceArea_1.save();
    await faceArea_2.save();
    await faceArea_3.save();


    // ----------------------- FACE USER -----------------------
    const findArea_1 = await Area.findOne({name: 'A'})
    const findArea_2 = await Area.findOne({name: 'B'})
    const findArea_3 = await Area.findOne({name: 'C'})

    // const findEquipment_1 = await Equipment.findOne({name: 'cam_1'})
    // const findEquipment_2 = await Equipment.findOne({name: 'cam_2'})
    // const findEquipment_3 = await Equipment.findOne({name: 'cam_3'})
    // const findEquipment_4 = await Equipment.findOne({name: 'iot_1'})
    // const findEquipment_5 = await Equipment.findOne({name: 'iot_2'})
    // const findEquipment_6 = await Equipment.findOne({name: 'iot_3'})

    const faceUser_1 = new User({
        email: 'demo_1@gmail.com.vn',
        role: 1,
    })
    const faceUser_2 = new User({
        email: 'demo_2@gmail.com.vn',
        role: 2,
        area: [
            findArea_1._id,
            findArea_3._id
        ]
    })
    const faceUser_3 = new User({
        email: 'demo_3@gmail.com.vn',
        role: 3,
        area: [
            findArea_2._id
        ],
        equipment: [
            findEquipment_2._id
        ]
    })
    const faceUser_4 = new User({
        email: 'demo_4@gmail.com.vn',
        role: 3,
        area: [
            findArea_2._id,
            findArea_3._id
        ],
        equipment: [
            findEquipment_2._id,
            findEquipment_3._id,
            findEquipment_6._id,
        ]
    })

    await faceUser_1.save()
    await faceUser_2.save()
    await faceUser_3.save()
    await faceUser_4.save()


}

m1()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})