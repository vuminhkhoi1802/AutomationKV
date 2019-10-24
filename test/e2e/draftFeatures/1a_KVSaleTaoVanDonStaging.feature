Feature: Tao Van Don tren moi truong moi - Staging

    #    Background:
    #        Given User already login to the KV Sale Page

    Scenario Outline: Nguoi dung tao van don thanh cong
        Given User already login to the KV Sale Page
        When Staging - Da chon san pham vao gio hang <product>
        And Staging - Dien thong tin giao hang
        #        And Staging - Dien thong tin doi tac giao hang <client> // KV not yet implemented Input for Ahamove
        And Staging - Chon doi tac ahamove
        And Staging - Thanh toan don hang
        Then Staging - Tao don hang thanh cong

        Examples:
            | client  | product        |
            | Ahamove | Bộ bé gái mèo |

#    Scenario: Nguoi dung huy don hang vua tao thanh cong
#        Given User already login to KV Management
#        When Ton tai ma don hang
#        When Vao chi tiet ma van don
#        And An nut Huy
#        And Vao chi tiet ma van don
#        Then Nguoi dung nhin thay van don o trang thai "Đã hủy"
