const express=require("express");
const path=require("path");
const app=express(), PORT=process.env.PORT||3000;
const BACKEND=process.env.FLASK_BACKEND_URL||"http://localhost:5000";
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.get("/health",(_req,res)=>res.json({status:"ok",service:"node-frontend"}));
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function resultPage(msg,error){return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Result</title><link rel="stylesheet" href="/style.css"></head><body><main class="card"><h1>${error?"Submission issue":"Submission complete"}</h1><p class="${error?"error":"success"}">${msg}</p><a href="/">Back to form</a></main></body></html>`;}
app.post("/submit",async(req,res)=>{
 const data={name:String(req.body.name||"").trim(),email:String(req.body.email||"").trim(),message:String(req.body.message||"").trim()};
 if(!data.name||!data.email||!data.message)return res.status(400).send(resultPage("Please complete all fields.",true));
 try{
  const r=await fetch(`${BACKEND}/api/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
  const out=await r.json();
  if(!r.ok)return res.status(r.status).send(resultPage(esc(out.message||"Backend rejected the submission."),true));
  return res.send(resultPage(`${esc(out.message)} Thank you, ${esc(data.name)}.`,false));
 }catch(e){console.error(e.message);return res.status(502).send(resultPage("Could not reach Flask backend. Please try again.",true));}
});
app.listen(PORT,"0.0.0.0",()=>console.log(`Node frontend listening on port ${PORT}; backend=${BACKEND}`));
