import React from 'react'
import { useSearchParams, useParams } from 'react-router-dom'

// Card components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>{children}</div>
)
const CardHeader = ({ children }) => <div className="px-6 py-4 border-b border-gray-200">{children}</div>
const CardTitle = ({ children }) => <h2 className="text-2xl font-bold text-gray-800">{children}</h2>
const CardDescription = ({ children }) => <p className="mt-1 text-sm text-gray-600">{children}</p>
const CardContent = ({ children }) => <div className="px-6 py-4">{children}</div>

// Table components
const Table = ({ children }) => <table className="min-w-full divide-y divide-gray-200">{children}</table>
const TableHeader = ({ children }) => <thead className="bg-gray-50">{children}</thead>
const TableBody = ({ children }) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
const TableRow = ({ children }) => <tr>{children}</tr>
const TableHead = ({ children }) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>
const TableCell = ({ children }) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{children}</td>

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams()
  const { id } = useParams()

  const paymentId = searchParams.get('razorpay_payment_id')
  const paymentLinkId = searchParams.get('razorpay_payment_link_id')
  const paymentLinkReferenceId = searchParams.get('razorpay_payment_link_reference_id')
  const paymentLinkStatus = searchParams.get('razorpay_payment_link_status')
  const signature = searchParams.get('razorpay_signature')

  return (
    <div className="container mx-auto p-4 max-w-2xl h-screen">
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Payment Successful
            </span>
          </CardTitle>
          <CardDescription>Your payment has been processed successfully.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>{paymentId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Payment Link ID</TableCell>
                <TableCell>{paymentLinkId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Payment Link Reference ID</TableCell>
                <TableCell>{paymentLinkReferenceId || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Payment Link Status</TableCell>
                <TableCell>{paymentLinkStatus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Signature</TableCell>
                <TableCell className="break-all">{signature}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Confirmation ID</TableCell>
                <TableCell>{id}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ConfirmationPage