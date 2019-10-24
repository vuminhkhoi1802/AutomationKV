Feature: Tao Van Don va Huy Don Tren KV

    Background:
        Given User already login to the KV Sale Page

    Scenario Outline: Nguoi dung tao van don thanh cong
        When Da chon san pham vao gio hang
        When Dien thong tin giao hang
        And Dien thong tin doi tac giao hang <client>
        And Thanh toan don hang
        Then Tao don hang thanh cong

        Examples:
            | client       |
            | Viettel Post |

    Scenario: Nguoi dung huy don hang vua tao thanh cong
        Given User already login to KV Management
        When Ton tai ma don hang
        When Vao chi tiet ma van don
        And An nut Huy
        And Vao chi tiet ma van don
        Then Nguoi dung nhin thay van don o trang thai "Đã hủy"
