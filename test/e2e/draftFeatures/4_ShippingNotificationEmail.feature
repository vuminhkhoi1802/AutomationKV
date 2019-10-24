Feature: Gui mail thong bao

    Scenario: Nguoi dung gui thong bao thanh cong
        Given already login to KV Shipping
        Given Dang o danh sach email thong bao
        When Them moi file thong bao
        Then Nguoi dung thay trang thai "Đã gửi hết"
#        And Nguoi dung thay gia tri Da Gui != 0
