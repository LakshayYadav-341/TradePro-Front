import React, { useState, useEffect } from "react";
import { getMarketTopData } from "../../services/api";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../components/ui/tooltip";
import { Badge } from "../../components/ui/badge";
import { TrendingUp, TrendingDown, Loader2, ChevronUp, ChevronDown } from "lucide-react";

const MarketTopList = ({ type }) => {
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                setLoading(true);
                const data = await getMarketTopData(type);
                setMarketData(data.categoryResponseMap[type]?.items || []);
            } catch (error) {
                console.error(`Error fetching ${type} data:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchMarketData();
    }, [type]);

    const renderPerformanceIcon = (performance) => {
        return performance >= 0 ? (
            <TrendingUp className="text-green-600 inline-block" size={20} />
        ) : (
            <TrendingDown className="text-red-600 inline-block" size={20} />
        );
    };

    const displayedItems = expanded ? marketData : marketData.slice(0, 6);

    return (
        <TooltipProvider>
            <Card className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-gray-100 dark:bg-gray-800 p-6 flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                        {type === "TOP_GAINERS" ? (
                            <>
                                <TrendingUp className="mr-3 text-green-600" size={28} />
                                Top Gainers
                            </>
                        ) : (
                            <>
                                <TrendingDown className="mr-3 text-red-600" size={28} />
                                Top Losers
                            </>
                        )}
                    </CardTitle>
                    <Badge 
                        variant={type === "TOP_GAINERS" ? "secondary" : "destructive"}
                        className="text-sm font-medium"
                    >
                        {marketData.length} Companies
                    </Badge>
                </CardHeader>
                <CardContent className="p-6">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="animate-spin text-gray-500 dark:text-gray-300" size={48} />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayedItems.map((item) => {
                                    const { company, stats } = item;
                                    const isPositive = stats.dayChangePerc >= 0;

                                    return (
                                        <Tooltip key={company.gsin}>
                                            <TooltipTrigger asChild>
                                                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md rounded-lg p-5 cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                                                    <div className="flex items-center mb-4">
                                                        <img
                                                            src={company.logoUrl}
                                                            alt={company.companyName}
                                                            className="h-14 w-14 object-contain mr-4 rounded-full"
                                                        />
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                                {company.companyShortName}
                                                            </h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                {company.companyName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                                                ₹{stats.ltp.toFixed(2)}
                                                            </p>
                                                            <div className="flex items-center mt-2">
                                                                {renderPerformanceIcon(stats.dayChangePerc)}
                                                                <span
                                                                    className={`ml-2 font-medium ${
                                                                        isPositive
                                                                            ? "text-green-600"
                                                                            : "text-red-600"
                                                                    }`}
                                                                >
                                                                    {stats.dayChange.toFixed(2)} (
                                                                    {stats.dayChangePerc.toFixed(2)}%)
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent 
                                                side="bottom" 
                                                className="bg-gray-900 text-white dark:bg-gray-100 dark:text-black"
                                            >
                                                <p>More details coming soon!</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    );
                                })}
                            </div>
                            {marketData.length > 6 && (
                                <div className="flex justify-center mt-6">
                                    <button
                                        onClick={() => setExpanded(!expanded)}
                                        className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        {expanded ? (
                                            <>
                                                Show Less
                                                <ChevronUp className="ml-2" size={20} />
                                            </>
                                        ) : (
                                            <>
                                                Show More
                                                <ChevronDown className="ml-2" size={20} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </TooltipProvider>
    );
};

export default MarketTopList;