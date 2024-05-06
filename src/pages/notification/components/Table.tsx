// TableComponent 
// cahqirib ishlashlik uchun <TableComponent data={data} />;
// kirib keluvchi malimout const data = [  data here  ];

const SmsTableComponent = ({ data }: any) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b border-gray-300 text-left leading-4  tracking-wider">Phone number</th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm leading-4  tracking-wider">Sent date</th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm leading-4  tracking-wider">Provider</th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm leading-4  tracking-wider">Error</th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm leading-4  tracking-wider">Activation code</th>
                        <th className="px-6 py-3 border-b border-gray-300 text-left text-sm leading-4  tracking-wider">Confirmed</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.map((item: any, index: any) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                <div className="flex items-center">
                                    <div>
                                        <div className="text-sm leading-5 text-gray-800">{item.phoneNumber}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-gray-500">{item.sentDate}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-gray-500">{item.provider}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-gray-500">{item.error}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-gray-500">{item.activationCode}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-gray-500">{item.confirmed}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SmsTableComponent;
