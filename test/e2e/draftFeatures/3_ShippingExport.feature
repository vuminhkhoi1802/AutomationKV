Feature: Nguoi dung xuat file

    Scenario: Nguoi dung xuat file van don o chi tiet gian hang
        Given already login to KV Shipping
        And Dang o danh sach cac gian hang
        When tim kiem gian hang va vao chi tiet gian hang
        And Vao danh sach van don - chi tiet gian hang
        And An nut "Xuất file"
        Then Nguoi dung download duoc file ve va file ton tai o trong thu muc Downloads

    Scenario: Nguoi dung xuat file van don o list van don
        Given Dang o danh sach van don
        When dien ngay hoan thanh
        And An nut "Xuất file" - list van don
        Then Nguoi dung download duoc file ve va file ton tai o trong thu muc Downloads

    Scenario: Nguoi dung xuat file danh sach gian hang
        Given Dang o danh sach cac gian hang
        When tim kiem ten gian hang "testzone17"
        When An nut "Xuất file" - danh sach gian hang
        Then Nguoi dung download duoc file ve va file ton tai o trong thu muc Downloads
