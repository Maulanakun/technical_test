### NOTES

- masuk ke environment backend test
- lalu Jalankan `npm install` terlebih dahulu
- setelah sudah konfigurasikan dulu databasenya di folder config
- setup semuanya dari buat database,migrate,dan seed
- jika sudah menjalankan programnya dengan perintah `npm run dev`
- Pada skeleton terdapat folder `__tests__`, folder ini berisi test dari url yang ada
- untuk menjalankan test `npm run test`

- disini saya tidak membuat authen untuk headersnya saya langung menembaknya dari postman sessionid dan diambil dari `req.headers` untuk id member yang mau pinjam dan bookId saya mengambil dari `req.params`,disini juga saya memakai table konjungsi untuk relasi one to many entitas member ke borrow dan entitas book ke borrow
