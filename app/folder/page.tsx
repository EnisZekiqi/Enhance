import { prisma } from "@/lib/text"
import { createTask, toggleTask, deleteTask } from "@/app/action";


export default async function Home() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-lg mx-auto py-10 space-y-6">
      <form
        action={async (formData) => {
          "use server";
          const title = formData.get("title") as string;
          if (title.trim().length > 0) {
            await createTask(title);
          }
        }}
        className="flex gap-2"
      >
        <input
          name="title"
          placeholder="Add a task..."
          className="border px-3 py-2 rounded-md w-full"
        />
        <button type="submit">Add</button>
      </form>

      <div className="space-y-3">
        {tasks.map((task) => (
          <form
            key={task.id}
            className="flex items-center justify-between border p-3 rounded-md"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked={task.completed}
                onChange={async () => {
                  "use server";
                  await toggleTask(task.id, !task.completed);
                }}
              />
              <span className={task.completed ? "line-through opacity-50" : ""}>
                {task.title}
              </span>
            </div>

            <button
              formAction={async () => {
                "use server";
                await deleteTask(task.id);
              }}
              variant="destructive"
            >
              Delete
            </button>
          </form>
        ))}
      </div>
    </div>
  )}