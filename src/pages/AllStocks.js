import React, { useEffect, useState } from "react";
import { useAuth } from '../hooks/useAuth';
import { Link } from "react-router-dom";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "../components/ui/table";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "../components/ui/card";
import { 
    ChevronRight, 
    TrendingUp, 
    TrendingDown, 
    Search 
} from "lucide-react";
import { motion } from "framer-motion";

// API Token
const API_TOKEN = "abcd";

export default function AllStocks() {
    const { allStocks } = useAuth();
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch stocks from API
    const fetchStocks = async (query) => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.stockdata.org/v1/entity/search?search=${query}&api_token=${API_TOKEN}`
            );
            const data = await response.json();
            if (data.data) {
                setStocks(data.data);
            } else {
                setStocks([]);
            }
        } catch (error) {
            console.error("Error fetching stock data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch default stocks initially
    useEffect(() => {
        fetchStocks("AAPL");
    }, []);

    // Update stocks when search term changes
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm.trim() !== "") {
                fetchStocks(searchTerm);
            } else {
                fetchStocks("AAPL");
            }
        }, 500); // Add debounce
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const getPerformanceIcon = (performance) => {
        return performance >= 0 ? (
            <TrendingUp className="text-green-500 inline-block mr-2" size={20} />
        ) : (
            <TrendingDown className="text-red-500 inline-block mr-2" size={20} />
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <TrendingUp className="text-blue-600" size={32} />
                            <h1 className="text-3xl font-bold text-gray-800">Stock Market</h1>
                        </div>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search stocks..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search 
                                className="absolute left-3 top-3 text-gray-400" 
                                size={20} 
                            />
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8 text-gray-500">
                            Loading stocks...
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Stock Name</TableHead>
                                    <TableHead>Company Name</TableHead>
                                    <TableHead>Stock Code</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stocks.map((stock) => (
                                    <motion.tr
                                        key={stock.symbol}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        whileHover={{ 
                                            backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                            scale: 1.01 
                                        }}
                                        className="hover:bg-blue-50 transition-all duration-200"
                                    >
                                        <TableCell className="font-medium flex items-center">
                                            {getPerformanceIcon(stock.performance || 0)}
                                            {stock.name || stock.symbol}
                                        </TableCell>
                                        <TableCell>{stock.name}</TableCell>
                                        <TableCell>{stock.symbol}</TableCell>
                                        <TableCell className="text-right">
                                            <Link
                                                to={`/stocks/${stock.symbol}`}
                                                state={{ stockCode: stock.symbol }}
                                                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                View Details
                                                <ChevronRight className="ml-2" size={16} />
                                            </Link>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    {stocks.length === 0 && !loading && (
                        <div className="text-center py-8 text-gray-500">
                            No stocks found matching your search
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
