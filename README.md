KV Shipping & KV Sale Automation
=================

**KV Shipping & KV Sale Automation** là một bộ script để chạy tự động luồng cơ bản sau:

Tạo Vận Đơn -> Hủy Vận Đơn (trên KV & Shipping) -> Xuất file -> Gửi Thông Báo -> Upload file đối soát.

Các tests được code bằng NodeJS sử dụng framework [WebDriverIO](http://webdriver.io/) và [Cucumber](https://cucumber.io/)  

Hướng Dẫn Ngắn
---------------

0. Cài đặt Visual Studio Code để edit code
1. Vào Gitlab tìm repo shipping
2. Cài đặt Git Bash cho windows

2a. Vào git bash -> đổi đường dẫn sang ổ C:/Users/Citigo/ -> gõ lệnh `mkdir .ssh` -> gõ `cd .ssh` -> gõ lệnh `ssh-keygen` -> ấn enter l tục để skip

2b. Gõ lệnh cat id_rsa.pub -> copy đoạn ssh public key

2c. Vào Settings của gitlab user, paste đoạn ssh public key đó vào mục key -> chọn add

2d. Clone repository về location tùy chọn trên ổ cứng

3. Cài đặt JDK 1.8 -> ADD JDK vào Global Path

4. Cài đặt nodeJS -> check NodeJS ở Global Path

5. Cài đặt Yarn -> check ở trên cmd bằng câu lệnh Yarn -v

6. Mở CMD -> CD vào đường dẫn của project đã clone ở trên

7. Gõ lệnh yarn install

8. Chạy test bằng câu lệnh `yarn tests:e2e`


Yêu Cầu về Cài Đặt các Package
---------------

- node >= 10.15.x - [how to install Node](https://nodejs.org/en/download/)
- yarn >= 1.16.x - [how to install Yarn](https://yarnpkg.com/en/docs/install)
- Selenium Grid: [Zalenium](https://github.com/zalando/zalenium) or [Selenium HQ](https://github.com/SeleniumHQ/docker-selenium) (Không bắt buộc phải cài)
- JDK (Java Development Kit) === 1.8.x - [how to install JDK 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- Docker & Docker-Compose @Latest - [Docker](https://docs.docker.com/install/) (chỉ cài khi cần chạy Selenium Grid)


```Lưu ý: không cài đặt JDK > JDK8 do sự không tương thích với Selenium-StandAlone của WebDriverIO của JDK 9 trở lên.```
- [Hướng dẫn add JDK vào Global Path cho Windows](https://javatutorial.net/set-java-home-windows-10)
- [Hướng dẫn add JDK vào Global Path cho Linux (Ubuntu)](https://vitux.com/how-to-setup-java_home-path-in-ubuntu/)

Getting Started
---------------
Step 1: Cài đặt các package ở trên

Step 2: Clone repo `git@gitlab.com:citigo47/shipipng-cs-auto-test.git` rồi cài đặt các dependencies theo câu lệnh sau:

```bash
$ yarn install
```

Chạy Selenium Grid với Zalenium: (Chỉ thực hiện khi cài docker và zalenium ở trên) 

`Linux`
 ```bash
$ chmod +X zalenium.sh
$ ./zalenium.sh
```

`Windows (ĐK: Docker đã được cài đặt trên máy)`
```
docker pull elgalu/selenium
docker pull dosel/zalenium
docker run --rm -ti --name zalenium -p 4444:4444 ^
  -v /var/run/docker.sock:/var/run/docker.sock ^
  -v /c/Users/your_user_name/temp/videos:/home/seluser/videos ^
  --privileged dosel/zalenium start     
```

Với Zalenium thì khi chạy câu lệnh `yarn tests:e2e` ta có thể truy cập vào đường link sau để view auto-test

`http://localhost:4444/grid/admin/live` 

Sau khi chạy auto-test xong, zalenium sẽ lưu lại video các auto-test đã chạy. Để xem được video thì cần truy cập vào đường link

`http://localhost:4444/dashboard/#`

Ở file config wdio.conf.js tên host mặc định nằm ở trường Selenium Server `hostname` (tên mặc định: localhost).  

Nếu bạn chỉ muốn chạy local bình thường mà không muốn chạy thông qua Selenium Server ở trên, 
thì bạn có thể sử dụng Selenium Standalone 
từ WebDriverIO (nếu bạn đã cài đặt JDK 8 ở trên) bằng cách bỏ dấu // (comment) 
ở dòng thứ 58 trong file `wdio.conf.js` (nếu chưa bỏ)

Step 3: Chạy e2e tests:

```bash
yarn tests:e2e
```


Project Structure
---------------
Dưới đây là sơ đồ cơ bản của bộ source code chạy automation 
```
shipping-cs-auto-test
├── test
│   └── data 
│        ├── Context.js
│        └── Data.json (các test data về logins của KV và shipping)
├── e2e
│   ├── constants
│   │    ├── documents (Các input test file document (csv, xlsx) sẽ được cất ở đây)
│   │    ├── CommonFunctions.constant.js (Các hàm hay được re-use thì define ở đây)
│   │    ├── CommonVariables.constant.js (Các biến hay được re-use thì define ở đây)
│   │    ├── SystemKeys.constant.js (Khai báo các phím tắt trên bàn phím ở đây)
│   │    ├── SystemLabels.constant.js
│   │    ├── SystemMessages.constant.js (Khai báo các message thông báo ở đây)
│   │    └── SystemURL.constant.js (Edit file này để chọn môi trường test)
│   │       
│   ├── features (Đặt file *.feature cần chạy tại thư mục này, rename theo kiểu đánh số đầu file để set thứ tự test case cần chạy)
│   │    ├── 1_KVSaleTaoVanDon.feature
│   │    ├── 2_ShippingRemoveDelivery.feature
│   │    ├── 3_ShippingExport.feature
│   │    ├── 4_ShippingNotificationEmail.feature
│   │    └── 5_ShippingCrossCheck.feature
│   │    (Các file *.feature mà không cần chạy thì sẽ tạm cất vào thư mục draftFeatures)
│   │ 
│   ├── pages
│   │    ├── KVManagement.page.js
│   │    ├── KVSale.page.js 
│   │    ├── KVShipping.page.js
│   │    ├── Login.page.js
│   │    └── ShippingLogin.page.js      
│   │   
│   └── steps
│        ├── KVManagement.step.js
│        ├── KVSale.step.js 
│        ├── KVShipping.step.js
│        ├── Login.step.js
│        └── ShippingLogin.step.js   
│  
└── wdio.conf.js (Đây là file config chính của project(
```

Reports - Check Báo Cáo sau khi chạy test
---------------

Chạy câu lệnh dưới đây sau khi test xong để webdriverio tạo ra báo cáo

```bash
yarn report:generate
```

Chạy câu lệnh dưới đây để xem bản báo cáo automation test trên trình duyệt
```bash
yarn report:open
```

Also, you can see [Timeline report](https://github.com/QualityOps/wdio-timeline-reporter) in `./test-report/timeline`

Eslint and Prettier
---------------
Đây là tool để kiểm tra xem bạn đã code theo đúng syntax & convention chưa

check lint:

```bash
yarn code:check
```

Run format lint:

```bash
yarn code:format
```
