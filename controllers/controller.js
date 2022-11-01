const Models = require("../models/model");   
var dayjs = require("dayjs");

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// ========================== ANCHOR START ACTION =========================================

const cekPesan = async () => { 
    try {
        const data = await Models.cekPesan() 
        if(data.length > 0){ 
            return data
        }else{
            return "None"
        } 
    } catch (e) {
        console.log(e)
        return "None"
    }
} 

const getContact = async () =>{
    try {
        const data = await Models.getContact()
        return data
        
    } catch (e) {
        console.log(e)
        return "None"
    } 
}
const updateFlag = async (id) =>{
    try {
        const data = await Models.updateFlag(id)
        return "Sukses"
        
    } catch (e) {
        console.log(e)
        return "None"
    } 
}
const cekPesanTagihan= async () =>{
    try {
        const data_pesan = await Models.cekPesanTagihan()    

        var tampil_data = []
        var no = 1;
        data_pesan.map( async (r)=>{
            tampil_data.push(`No: ${no}
            Jenis : ${r.jenis_tagihan}
            ${r.nama_properti} - ${r.nama_kav}
            (${r.kode_konsumen}) :: ${r.nama}
            No Tlp: ${r.telp}
            Jml Tagihan: Rp ${numberWithCommas(r.tagihan)}
            Kekurangan Pembayaran : Rp ${numberWithCommas(r.kurang)}
            Marketing : ${r.nama_marketing}
            `)
            
            no++;
        })

        if(tampil_data.toString().length > 10){
            const header = `🔔 *Berikut Kami informasikan Tagihan Konsumen yang Jatuh Tempo Hari ini*\n\n`
            const respons = `${header}${tampil_data.join(" \n")}\n_Last Update: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}_`
            return respons
        }else{
            return "None"
        } 
        
    } catch (e) {
        console.log(e)
        return "None"
    } 
}
module.exports = {
    cekPesan, getContact,updateFlag,cekPesanTagihan
  }
 