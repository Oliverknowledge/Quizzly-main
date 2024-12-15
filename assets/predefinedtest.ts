import { questionTypes } from "@/types/Usertypes"

export const questions : questionTypes[] =[
    {
        id: "1",
        name: "Addition",
        image: undefined,
        text: "Work out 180 + 67",
        grade: "1",
        calculator: false,
        answer: "247",
       
    },
    {
        id: "2",
        name: "HCF",
        image: undefined,
        text: "Find the highest common factor (HCF) of 60 and 114",
        grade: "4",
        calculator: false,
        answer: "6",
     
    },
    {
        id: "3",
        name: "Angles in polygons",
        image: "/q3.png",
        text: "Work out the number of sides of the polygon",
        grade: "5",
        calculator: true,
        answer: "10",
       
    },
    {
        id: "4",
        name: "Recurring decimal",
        image: undefined,
        text: "Write 0.˙35˙9 as a fraction in its simplest form",
        grade: "6",
        calculator: false,
        answer: "133/37",
    
    },
    {
        id: "5",
        name: "Recurring decimal",
        image: "/q5.png",
        text: "By considering bounds, work out the value of u to a suitable degree of accuracy.",
        grade: "7",
        calculator: true,
        answer: "22",
   
    },
    {
        id: "6",
        name: "Cosine and sine rule",
        image: "/q6.png",
        text: "Find x, to 3 significant figures.",
        grade: "7",
        calculator: true,
        answer: "4.55",
       
    },
    {
        id: "7",
        name: "",
        image: "/q6.png",
        text: "Find x, to 3 significant figures.",
        grade: "7",
        calculator: true,
        answer: "4.55",
        
       
    },
    {
        id: "8",
        name: "Equation of tangents",
        image: "/q8.png",
        text: "Find the equation of the tangent to the circle. Give your answer in the form y = mx + c, where y, m and c are integers",
        grade: "9",
        calculator: true,
        answer: "3y = 5x - 58",
        
       
    },

   

]