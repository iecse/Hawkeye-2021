import React, { ReactElement, useEffect, useState } from "react";
import { get, post ,put} from "../utils/requests";
import { Nullable, QuestionType } from "../utils/types";

export default function AdminPage(): ReactElement {
    
    const [leaderboard, setLeaderboard] = useState([]);
    const [questions, setQuestions] = useState<Nullable<QuestionType> | any>();
    
    const fetchLeaderboard = async () => {
        try {
          await get("/leaderboard").then(setLeaderboard);
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        (async () => {
          try {
            await fetchQuestions();
          } catch (err) {
           
          }
        })();
        return () => {
          setQuestions({});
        };
      }, [leaderboard , questions]);

      const fetchQuestions = async () => {
        try {
          await get("/questions").then(setQuestions);
        } catch (err) {
          console.log(err);
        }
      };


    const [edit , setEdit] = useState<boolean>(false);

  return <div className="admin">
    <p onClick={() => {setEdit(!edit)}}>Add a questiondd</p>
    {edit && <AdminAddQuestion />}
    {questions.map((question: any , index: any) => {
    return(
      <AdminQuestion question={question} key={index} />
    );
    })}
    
  </div>;
}


interface QuestionsProps{
  question : QuestionType,
}




function AdminQuestion(questionobj: any ):ReactElement<QuestionsProps> {
  const[expand , setExpand] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
    event.preventDefault();
    console.log("from handle sunb");
    try {
      await put(`/questions/add/${quesID}`, {
        text,
        answer,
        hints,
        keywords,
        level,
        region,
      });
    } catch (err) {
      throw err;
    }
 };
 const[quesID , setquesID] = useState<string>('');
const [text , setText] = useState<string>('');
    const [answer , setAnswer] = useState<string>('');
    const [hints , setHints] = useState<Array<string>>([]);
    const[keywords , setKeywords] = useState<Array<string>>([]);
    const [level , setLevel] = useState<number>();
    const[region , setRegions] = useState('');

    useEffect(() => {
      setText(questionobj.question.text);
      setAnswer(questionobj.question.answer);
      setHints(questionobj.question.hints);
      setLevel(questionobj.question.level);
      setKeywords(questionobj.question.keywords);
      setquesID(questionobj.question._id);
      setRegions(questionobj.question.region);
      console.log(hints[0]);
    }, [])

    const updateHint= (index:number) => (event : React.ChangeEvent<HTMLInputElement>)  => {
      const newArr : string[] = [...hints];
  
      newArr[index] = event.target.value; 
  
      setHints(newArr); 
  }

  return(
    <div >
      <span onClick={() => {setExpand(!expand)}}>{text}   </span>
      {
      expand && <div style={{width: "20px"}}>
     <form  id="updateQues" style={{    display: "grid"}} onSubmit={handleSubmit}>
      <label htmlFor="ques">Text</label>
      <input id="ques" value={text} onChange={(e) => setText(e.target.value)}/>
      <label htmlFor="answer">answer</label>
      <input id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
      {hints.map((hint , ind) =>{
        return(
          <>
          <label htmlFor={"hint"+ind}>hint{ind+1}</label>
          <input id={"hint"+ind} value={hint} onChange={updateHint(ind)}/> 
          
          </>
        );
      })}
      <label htmlFor="keywords">keywords</label>
      <input id="keywords" />
      <label htmlFor="level">level</label>
      <input id="level" value={level}  onChange={(e) => setLevel(Number(e.target.value))} />
      <button type="submit" form="updateQues" value="Submit">Submit</button>
      <label htmlFor="regionname">regionname</label>
      <input id="regionname" />
      <label htmlFor="regiondesc">regiondesc</label>
      <input id="regiondesc" />
     </form>
    </div>
    }
    </div>
  );
}




 function AdminAddQuestion(): ReactElement {

  const[quesID , setquesID] = useState<string>('');
  const [text , setText] = useState<string>('');
      const [answer , setAnswer] = useState<string>('');
      const [hints , setHints] = useState<Array<string>>([]);
      const[keywords , setKeywords] = useState<Array<string>>([]);
      const [level , setLevel] = useState<number>();
      const[region , setRegions] = useState('');

      const updateHint= (index:number) => (event : React.ChangeEvent<HTMLInputElement>)  => {
        const newArr : string[] = [...hints];
    
        newArr[index] = event.target.value; 
    
        setHints(newArr); 
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
      event.preventDefault();
      console.log("from handle sunb");
      try {
        await put(`/questions/add/${quesID}`, {
          text,
          answer,
          hints,
          keywords,
          level,
          region,
        });
      } catch (err) {
        throw err;
      }
   };

   return(
     <div>
       <div style={{width: "20px"}}>
     <form  id="updateQues" style={{    display: "grid"}} onSubmit={handleSubmit}>
      <label htmlFor="ques">Text</label>
      <input id="ques" value={text} onChange={(e) => setText(e.target.value)}/>
      <label htmlFor="answer">answer</label>
      <input id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
      {hints.map((hint , ind) =>{
        return(
          <>
          <label htmlFor={"hint"+ind}>hint{ind+1}</label>
          <input id={"hint"+ind} value={hint} onChange={updateHint(ind)}/> 
          
          </>
        );
      })}
      <label htmlFor="keywords">keywords</label>
      <input id="keywords" />
      <label htmlFor="level">level</label>
      <input id="level" value="{level}"  onChange={(e) => setLevel(Number(e.target.value))} />
      <button type="submit" form="updateQues" value="Submit">Submit</button>
      <label htmlFor="regionname">regionname</label>
      <input id="regionname" />
      <label htmlFor="regiondesc">regiondesc</label>
      <input id="regiondesc" />
     </form>
    </div>
     </div>
   );
 }