let day;

const dataEntries = document.querySelectorAll(".data-entry");

const button = document.querySelector(".btn");




//Back to System
const days = document.getElementById("days");
const months = document.getElementById("months");
const years = document.getElementById("years");



const date = new Date();


function GetInputData()
{
    dataEntries.forEach(entry => 
    {
        const input = entry.querySelector("input");
        const id = input.id;
        const value = input.value;

        const secondP = entry.getElementsByTagName("p")[1];


        switch (id)
        {
            case "day":
                day = value;
                break;
            case "month":
                month = value;
                break;
            case "year":
                year = value;  
                break;
        }

        CheckIfValueIsNull(entry,value,secondP);        
    });


    const results = CheckIsValidDate([day,month,year]);

    console.log(VerifyAllValuesMatch(results));
    if(VerifyAllValuesMatch(results))
    {
        CompareData();
    }

}


function CheckIsValidDate(dateObject)
{
    const [day,month,year] = dateObject;
    const maxDays = new Date(2000,month,0).getDate();
    
    const currentYear = date.getFullYear();
    const currenMonth = date.getMonth();


    //Check if day fits the month
    let validDay = day >= 1 && day <= maxDays;

    //Check That month is valid
    const validMonth = month >= 1 && month <= 12;
    if(!validMonth)
        validDay = day < 31 && validDay > 0;

    //Check that year is valid
    const validYear = year <= currentYear;

    return {validDay,validMonth,validYear};


}

function CheckIfValueIsNull(object,value,elementToSetText)
{
    const childElements = object.querySelectorAll("*");

    childElements.forEach(child =>
    {


        if(value == "" || value == null || value == undefined)
        {
            child.classList.add("warning");
            if(child.classList.contains("visible"))
                child.style.visibility = "visible";       

            elementToSetText.textContent = "This field is required";
        }
        else 
        {
            child.classList.remove("warning");
            if(child.classList.contains("visible"))
                child.style.visibility = "hidden";

            elementToSetText.textContent = "";

        }
    });

}

function VerifyAllValuesMatch(dateObject)
{
    const {validDay,validMonth,validYear} = dateObject; 


    let allGood = ![validDay, validMonth, validYear].some(value => !value);

    dataEntries.forEach(child =>
    {
        const secondP = child.getElementsByTagName("p")[1];
        const id = secondP.id;

        
        


        switch (id)
        {
            case "day-warning":
                if(!validDay && !secondP.textContent.includes("This field is required"))
                {
                    SetProperWarningText(child,secondP,"Must be a valid day");
                    allGood = false;                    
                }
                break;
            case "month-warning":
                if(!validMonth && !secondP.textContent.includes("This field is required"))
                {
                    SetProperWarningText(child,secondP,"Must be a valid month");
                    allGood = false;                    
                }   
                break;             
            case "year-warning":
                if(!validYear && !secondP.textContent.includes("This field is required"))
                {
                    SetProperWarningText(child,secondP,"Must be in the past");
                    allGood = false;                    
                }
                break;
               
        } 
    });

    console.log(allGood);
    return allGood;


}





//Good
function SetProperWarningText(parentObject,targetObject,text)
{
    const childElements = parentObject.querySelectorAll("*");

    console.log("The parent object is: " + parentObject + " The target object is: " + targetObject + " The text is: " + text);
    
    childElements.forEach(child =>
    {
        targetObject.textContent = text;


        child.classList.add("warning");
        if(child.classList.contains("visible"))
            child.style.visibility = "visible"; 

    });
}


//Good
function CompareData()
{
    const birthDate = new Date(year ,month - 1,day);

    let ageInyears;
    let ageInMonths;
    let ageInDays;

    let currYear = date.getFullYear();
    let currMonth = date.getMonth();
    let currDay = date.getDate();


    // Get Exact year Gap
    if(month > birthDate.getMonth() || (month == birthDate.getMonth() && date >= birthDate.getDate()))
        ageInyears  = currYear - birthDate.getFullYear();
    else
        ageInyears = currYear - birthDate.getFullYear() - 1;


    // Get Exact Month Gap
    if(date.getDate() >= birthDate.getDate())
        ageInMonths = currMonth - birthDate.getMonth();
    else if(date.getDate() < birthDate.getDate())
        ageInMonths = currMonth - birthDate.getMonth() - 1;


    ageInMonths = ageInMonths < 0 ? ageInMonths + 12 : ageInMonths;

    // Get Days
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(date.getDate() >= birthDate.getDate())
        ageInDays = currDay - birthDate.getDate();
    else
        ageInDays = currDay - birthDate.getDate() + monthDays[currMonth - 1];

    
    days.textContent = ageInDays;
    months.textContent = ageInMonths;
    years.textContent = ageInyears;
}

//Good
button.addEventListener("click", function () 
{
    GetInputData();    
});


