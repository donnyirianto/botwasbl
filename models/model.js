const conn_local = require('../services/db');

const cekPesan = async (kdcab) => {
    
    try { 
        const data = await conn_local.query(`
        SELECT * FROM wa WHERE status_wa = 0 ORDER BY id limit 1;
        `)

        return data

    } catch (e) { 
        return "Gagal"
    }
} 
const getContact = async (kdcab) => {
    
    try { 
        const data = await conn_local.query(`
        SELECT * FROM wa_contact;
        `)

        return data

    } catch (e) { 
        return "Gagal"
    }
} 
const cekPesanTagihan = async () => {
    
    try { 
        const data = await conn_local.query(`
        SELECT b.nama AS jenis_tagihan,
d.kode AS kode_konsumen,d.nama,d.telp,
f.nama AS nama_properti,
g.nama AS nama_kav,
e.name AS nama_marketing,
a.tagihan,a.kurang
FROM tagihan a 
LEFT JOIN jenis_tagihan b ON a.id_jenis = b.id 
LEFT JOIN konsumen_spr c ON a.id_spr = c.id
LEFT JOIN konsumen d ON c.id_konsumen = d.id
LEFT JOIN users e ON c.id_marketing= e.id
LEFT JOIN properti f ON c.id_properti = f.id
LEFT JOIN properti_kav g ON c.id_kav = g.id
WHERE tgl_jatuhtempo = CURDATE();
        `)

        return data

    } catch (e) { 
        return "Gagal"
    }
} 
const updateFlag = async (id) => {
    
    try { 
        await conn_local.query(`
        update wa set status_wa = 1 where id = ${id}
        `)

        return "Sukses"

    } catch (e) { 
        return "Gagal"
    }
} 
module.exports = {
    cekPesan, getContact,updateFlag,cekPesanTagihan
}