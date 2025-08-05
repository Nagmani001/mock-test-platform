export default function Nav() {
  return <div className="flex justify-between p-4">
    <div className="flex items-center gap-x-2">
      <div className=""> logo </div>
      <div className="font-semibold text-xl">Name of company</div>
    </div>
    <div className="flex justify-center gap-x-3">
      <button onClick={() => {
        alert("singup")
      }}>Signup</button>
      <button
        onClick={() => {
          alert("singin")
        }}
      >Signin</button>
    </div>
  </div>
}
