import Table from './components/Table';
import { tableData } from './mock';

function App() {
    return (
        <div className='flex justify-center w-screen'>
            <Table data={tableData} />
        </div>
    );
}

export default App;
