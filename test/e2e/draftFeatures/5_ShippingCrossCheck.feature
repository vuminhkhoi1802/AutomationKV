Feature: Upload file doi soat

    Scenario Outline: Upload file doi soat thanh cong
        Given already login to KV Shipping
        And Dang o danh sach doi soat
        When Chon loai doi soat <type>
        And Tao moi doi soat using <client>, <dateFrom>, <dateTo>, <file>
        Then Ra duoc man hinh co gia tri lech khac 0

        Examples:
            | type | client          | dateFrom   | dateTo     | file                                                   |
            | COD  | Giao hàng nhanh | 01/04/2019 | 02/04/2019 | DoisoatCODGHN05.04 (01.04 -02.04).xlsx                 |
            | COD  | Viettel Post    | 01/04/2019 | 02/04/2019 | DoisoatCODVTP05.04 (01.04 -02.04).xlsx                 |
            | FEE  | Giao hàng nhanh | 01/01/2019 | 31/01/2019 | DoiSoatPVCGHN201.01.31 (01.01 - 31.01) (2) - Copy.xlsx |

