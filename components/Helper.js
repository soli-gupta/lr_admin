import $ from 'jquery'

export const validateForm = (e, form_id = false) => {
    let error = 0;
    if (form_id) {
        let form = document.getElementById(form_id)
        if (!form.checkValidity()) {
            error++;
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated')
    } else {
        let forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                if (!form.checkValidity()) {
                    error++;
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated')
            })
    }

    if (error) {
        return false
    } else {
        return true
    }
}

export const createSlug = (value, input) => {
    const convertToSlug = value.toLowerCase().replace(/ /g, '-');
    if (typeof window !== "undefined") {
        document.getElementById(input).value = convertToSlug;
        return convertToSlug;
    }

}

export const dateFormat = (date) => {
    return new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC' });
}

export const convertTimeStamp = (date) => {
    let currentDate = new Date(date)
    let dateFormat = currentDate.toDateString()
    let timeFormat = currentDate.toLocaleTimeString('en-US', { hour12: true });
    let convertDate = dateFormat + ' , ' + timeFormat
    return convertDate;
}

export const onlyNumberKey = (evt) => {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}


export const validateFormField = (inputId, errorId) => {
    var createError = 0;
    let input = document.getElementById(inputId).value
    if (input && input.length <= 0) {
        document.getElementById(errorId).innerHTML = 'Please select brand!';
        document.getElementById(errorId).style.display = "block";
        setTimeout(() => {
            document.getElementById(errorId).innerHTML = '';
            document.getElementById(errorId).style.display = "none";
        }, 3000);
        createError++;
    }
    if (createError > 0) {
        // setTinyLoader(false);
        return false;
    }
}


export const ButtonSpinner = props => {
    return (
        <>
            {
                props.load ?
                    <div className="spinner-border spinner-border-sm mx-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    : props.btnName
            }
        </>
    )
}

export const numberFormatter = (value) => {
    const formattedNumber = new Intl.NumberFormat('en-IN', {
        // style: 'currency',
        // currency: 'INR'
    }).format(value);
    return formattedNumber
}

export const getWeeksDate = (res, days) => {
    let resultDate = [];
    const result = new Date(res);
    result.setDate(result.getDate() + days);
    resultDate = result;
    return resultDate;
}

export const weekDatesForForms = (limit) => {
    let todayDate = new Date();
    let tommrow = todayDate.getDate() + 1;
    let weekDates = [];
    let weekCal = [];
    for (let i = 0; i < limit; i++) {
        let days = getWeeksDate(todayDate, i);
        weekDates.push({
            day: days.getDate(),
            month: days.toLocaleString('default', { month: 'short' }),
            weekDay: days.getDate() === todayDate.getDate() ? 'Today' : days.getDate() === tommrow ? 'Tommrow' : days.toLocaleDateString('en-IN', { weekday: 'long' }),
            year: days.getFullYear(),
            dateValue: days.getFullYear()
        });
        weekCal = weekDates;
    }
    return weekCal;
}

// export const convCreatedDate = (date) => {
//     let todayDate = new Date(date);
//     // let tommrow = todayDate.getDate() + 1;
//     let weekDates = {
//         day: todayDate.getDate(),
//         month: todayDate.toLocaleString('default', { month: 'short' }),
//         year: todayDate.getFullYear(),
//     };
//     // console.group(weekDates);
//     let weekCal = {};
//     // for (let i = 0; i < limit; i++) {
//     //     let days = getWeeksDate(todayDate, i);
//     //     weekDates.push({
//     //         day: days.getDate(),
//     //         month: days.toLocaleString('default', { month: 'short' }),
//     //         weekDay: days.getDate() === todayDate.getDate() ? 'Today' : days.getDate() === tommrow ? 'Tommrow' : days.toLocaleDateString('en-IN', { weekday: 'long' }),
//     //         year: days.getFullYear(),
//     //         dateValue: days.getFullYear()
//     //     });
//     // }
//     // weekCal = weekDates.toString()
//     // console.log(JSON.parse(weekCal));
//     // return weekDates.toString();
// }

export const databaseDateConverter = (date) => {
    let day = new Date(date);
    let convDate = {
        day: day.getDate(),
        month: day.toLocaleString('default', { month: 'short' }),
        year: day.getFullYear(),
        weekDay: day.toLocaleDateString('en-IN', { weekday: 'short' })
    }
    return convDate;
}

export const fullDatabaseDateConverter = (date) => {
    let day = new Date(date);
    let convDate = {
        day: day.getDate(),
        month: day.toLocaleString('default', { month: 'long' }),
        year: day.getFullYear(),
        weekDay: day.toLocaleDateString('en-IN', { weekday: 'long' })
    }
    return convDate;
}


export const dateConverterForValue = (day, month, year) => {
    const convDateMonth = new Date(`${month},${year}`).getMonth() + 1
    const convDate = year + '-' + convDateMonth + '-' + day
    return convDate;
}

export function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

export function formatHoursTo12Hour(date) {
    return date.getHours() % 12 || 12;
}

export const capitalizeFirstLetter = (str) => {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

export const countdown = (elementName, minutes, seconds) => {

    var element, endTime, hours, mins, msLeft, time;

    function twoDigits(n) {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer() {
        msLeft = endTime - (+new Date);
        if (msLeft < 1000) {
            element.innerHTML = "";
            document.getElementById('resendOtp').style.display = 'inline-block'
        } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
            setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
        }
    }

    element = document.getElementById(elementName);
    endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;
    updateTimer();
}

export const onlyAlphaValidation = (event) => {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/[a-z]/i);
    return pattern.test(value);
}

export const ConfirmationModal = props => {
    return (
        <div className={`${props.confirm ? "open-popup" : ""} common-popup are-you-sure login`}>
            <div className='popup-inner'>
                <div className='popup-close' onClick={props.closePop}></div>
                <div className='before-otp'>
                    <h3>{props.msg}</h3>
                    <button className='btn arrow-style blue-btn' onClick={props.method}>Yes</button>
                    <button type="button" className='btn arrow-style blue-btn grey' onClick={props.closePop}>Cancel</button>
                </div>
            </div>

        </div>
    )
}

// export function calculateEMI(principal, interestRate, timePeriod) {
//     let monthlyInterestRate = interestRate / 1200;
//     let totalPayments = timePeriod * 12;
//     console.log(totalPayments);
//     let emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
//     return emi.toFixed(2);
// }

export function calculateEMI(loanAmount, interestRate, loanTenure) {


    // Calculate monthly interest rate and loan tenure in months
    var monthlyInterestRate = parseInt(interestRate) / 1200;
    var loanTenureInMonths = loanTenure * 12;
    // Calculate EMI
    var emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenureInMonths) / (Math.pow(1 + monthlyInterestRate, loanTenureInMonths) - 1);

    // Calculate total interest payable
    var totalInterestPayable = emi * loanTenureInMonths - loanAmount;

    // Calculate total loan amount
    var totalLoanAmount = parseFloat(loanAmount) + parseFloat(totalInterestPayable);

    return ({ totalLoan: totalLoanAmount.toFixed(2), emi: emi.toFixed(2), interesPayable: totalInterestPayable.toFixed(2) });
}