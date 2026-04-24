import { Route } from "../routes/pattern.$id";

export default function PatternViewPage() {
    const navigate = useNavigate()
  const { id } = Route.useParams();
  const { patternId } = Route.useLoaderData()

  // 2. Local State
  const [patternName, setPatternName] = useState('My Pattern')
  const [currentRow, setCurrentRow] = useState(1)

  // const data = Route.useLoaderData()

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-6">
        <button onClick={() => navigate({ to: '/' })}>← Back</button>
        <h1 className="text-2xl font-bold">{patternName}</h1>
        <div className="text-sm text-gray-500">ID: {id}</div>
      </header>

      <main className="bg-white border rounded-xl p-6">
        <p>This is your separate component logic for ID: {patternId}</p>
        <div className="mt-4">
            <label>Current Row: </label>
            <button onClick={() => setCurrentRow(r => r + 1)} className="border px-2">
                {currentRow}
            </button>
        </div>
      </main>
    </div>
  )
}
