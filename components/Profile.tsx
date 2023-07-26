import PromptCard from "./PromptCard"

export default function Profile({name, desc, data, handleEdit, handleDelete}: any) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">{name} Profile</h1>
    </section>
  )
}
