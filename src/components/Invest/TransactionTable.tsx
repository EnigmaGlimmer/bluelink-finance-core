import "@/assets/css/home/invest.css";

interface Transaction {
    date: string;
    amount: string | number;
    hash: string;
}

interface TransactionTableProps {
    transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
    return (
        <div className="overflow-x-auto">
            <table className="transaction-table">
                <thead>
                    <tr className="table-header">
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Transaction Hash</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx, index) => (
                        <tr key={index} className="table-body">
                            <td>{tx.date}</td>
                            <td>{tx.amount}</td>
                            <td className="truncate max-[425px]">{tx.hash}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
