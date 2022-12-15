/*
* Lấy dữ liệu
* Author: LTVU (13/12/2022)
*/


// Load dữ liệu
function loadData() {
    try {
        $.ajax({
            type: "GET",
            url: "https://amis.manhnv.net/api/v1/Employees",
            success: function (response) {
                for (const emp of response) {
                    var employeeCode = emp.EmployeeCode;
                    var employeeName = emp.EmployeeName;
                    var phoneNumber = emp.PhoneNumber;
                    var divHTML = `<tr>
                                        <td class="check"><div class="check-box"></td>
                                        <td class="teacher-code">${employeeCode || ""}</td>
                                        <td class="teacher-name">${employeeName || ""}</td>
                                        <td class="phone-number">${phoneNumber || ""}</td>
                                        <td class="specialize"></td>
                                        <td class="subject"></td>
                                        <td class="room"></td>
                                        <td class="training"><div class="ticked"></div></td>
                                        <td class="working"></td>
                                        <td class="manager">
                                            <div class="manager-box">
                                                <div class="edit"></div>
                                                <div class="delete"></div>
                                            </div>
                                        </td>
                                    </tr>`;
                    $(".main-table").append(divHTML);
                }
            },
            error: function (error) {

            }
        });
    } catch (error) {

    }

}

/**
 * Hàm  mở dialog
 * Author: LTVu (14/12/2022)
 */

const showDialog = function () {
    try {
        $(".dialog-container").show();
        // Lấy mã nhân viên mới
        $.ajax({
            type: "GET",
            url: "https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode",
            success: function (response) {
                $("#txtTeacherCode").val(response);
            }
        });
        debugger
        //focus vào ô nhập liệu đầu tiên
        $("#txtTeacherCode").focus();
    } catch (error) {
        console.log("error");
    }
};

/**
 * Hàm  đóng dialog
 * Author: LTVu (14/12/2022)
 */

const closeDialog = function () {
    try {
        $(".dialog-container").hide();
    } catch (error) {
        console.log("error");
    }
};

/**
 * Lưu dữ liệu
 * AUTHOR: DDDuong (09/12/2022)
 */

const btnSaveOnClick = function () {
    try {
        //1.Thu thập dữ liệu trên form
        const teacherCode = $("#txtTeacherCode").val();
        const teacherName = $("#txtTeacherName").val();
        const mobie = $("#txtTelephoneNumber").val();
        const email = $("#txtEmail").val();
        let errorMsgs = [];
        errorFocus = [];

        //2.kiểm tra dữ liệu

        //-Dữ liệu bắt buộc đã nhập chưa
        if (!teacherCode) {
            errorMsgs.push("Số hiệu cán bộ không được phép để trống");
            $("#txtTeacherCode").parent().css("border-color", "red");
            errorFocus.push($("#txtTeacherCode"));
        } else {
            $("#txtTeacherCode").parent().css("border-color", "#9E9E9E");
        }
        if (!teacherName) {
            errorMsgs.push("Họ và tên không được phép để trống");
            $("#txtTeacherName").parent().css("border-color", "red");
            errorFocus.push($("#txtTeacherName"));
        } else {
            $("#txtTeacherName").parent().css("border-color", "#9E9E9E");
        }
        //Clear error message
        //document.querySelector(".toast-message-content").innerHTML = "";
        //-Kiểm tra errorMsgs xem có lỗi không
        if (errorMsgs.length > 0) {
            // Nếu có lỗi thì hiển thị ra dialog báo lỗi
            for (const errMsg of errorMsgs) {
                $(".toast-message-content").append(`<div >${errMsg}</div>`);
            }
            $(".toast-message-container").css("display", "flex");
        }
        else { //3. gọi API save dữ liệu
            $.ajax({
                type: "POST",
                url: "https://amis.manhnv.net/api/v1/Employees",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    employeeCode: `${teacherCode}`,
                    employeeName: `${teacherName}`,
                    email: `${email}`,
                    telephoneNumber: `${mobie}`,
                    departmentId: "142cb08f-7c31-21fa-8e90-67245e8b283e",
                }),
                success() {
                    alert("success");
                    $(".dialog-container").hide();
                    loadData();
                },
                error(error) {
                    console.log(error);
                },
            });
        }


        //4. Xử lí thông tin từ API trả về
    } catch (error) {
        console.log("error");
    }
};

/**
 * Đóng thông báo lỗi
 * Author: LTVu (14/12/2022)
 */
const bntCloseErrorMessage = function () {
    try {
        $(".toast-message-container").hide();

        if (errorFocus.length > 0) {
            errorFocus[0].focus();
        }
    } catch (error) {
        console.log("error");
    }
};

/**
 * Hàm khi nhập dữ thì cho ô input đang lỗi trở về bình thường
 * AUTHOR: LTVu (14/12/2022)
 */
const onValidateFieldRequired = function () {
    try {
        const employeeCode = $("#txtEmployeeCode").val();
        if (!employeeCode) {
            $("#txtTeacherCode").parent().css("border-color", "#red");
        } else {
            $("#txtTeacherCode").parent().css("border-color", "#9E9E9E");
        }

        const employeeName = $("#txtTeacherName").val();
        if (!employeeName) {
            $("#txtTeacherName").parent().css("border-color", "#red");
        } else {
            $("#txtTeacherName").parent().css("border-color", "#9E9E9E");
        }
    } catch (error) {
        console.log(error);
    }
};

function createEvent() {
    loadData();
    $(".btn-add").click(showDialog);
    $(".dialog-btn-close").click(closeDialog);
    $(".btn-close").click(closeDialog);
    $(".btn-save").click(btnSaveOnClick);
    $("#txtTeacherCode").blur(onValidateFieldRequired);
    $("#txtTeacherName").blur(onValidateFieldRequired);
    $(".toast-message-close").click(bntCloseErrorMessage);
}
createEvent();