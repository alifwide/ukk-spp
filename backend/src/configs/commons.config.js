module.exports = {

  ADMIN_SECRET_KEY: 'f420a1164a99d9ec8f035649ae955ce58f5647dd2c585a1e9296be33ecf9928aa4b2337ea9b616bd754d958ff1997a95',
  PETUGAS_SECRET_KEY: '5598a02148adc44de517517b771f12df3a3118bf157dcb3fa091421850808b8b9586c62bfb9404ca5bf8c8eabc4a1a66',
  SISWA_SECRET_KEY: 'c05c93be00b2ccbe4450aa460b5e07e239442edbf8fb6cc93ccdb0dc54ab41065eeab458db9762e0649435c4906e7379',

  ADMIN_DEFAULT_USERNAME: 'admindefault',
  ADMIN_DEFAULT_PASSWORD: '443e8c1f116b7e7b3bb989aede31b6db821a98a1ccf50800fdb31c42b7d1a93f',

  TABLES : {
    SISWA: 'siswa',
    KELAS: 'kelas',
    PEMBAYARAN: 'pembayaran',
    PETUGAS: 'petugas',
    SPP: 'spp'
  },

  ERR_MESSAGES : {
    INVALID_TABLE: table =>  `table ${table} does not exist!`,
    INVALID_USERNAME: username => `cannot found username ${username} `,
    INVALID_EMAIL: email => `cannot found email ${email}`,
    UNAOTHORIZED: 'token is expired',
    DATA_INCOMPLETE: 'data incomplete',
    WRONG_PASSWORD: 'invalid password'
  }

}