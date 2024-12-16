import React, { useState, useEffect } from "react";
import { getMarketOverview } from "../services/api";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { TrendingUp, TrendingDown, Loader } from "lucide-react";

const MarketOverview = () => {
    const [marketData, setMarketData] = useState({ indices: [], sectors: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getMarketOverview();
                setMarketData(data);
            } catch (error) {
                console.error("Error fetching market overview:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderPerformance = (performance) => {
        return performance >= 0 ? (
            <TrendingUp className="text-green-500 inline-block" size={20} />
        ) : (
            <TrendingDown className="text-red-500 inline-block" size={20} />
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                        Market Overview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <Loader
                                className="animate-spin text-gray-500"
                                size={32}
                            />
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">
                                Major Indices
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {marketData.indices.map((index) => (
                                    <Card key={index.symbol}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                {index.name}
                                                {renderPerformance(
                                                    index.change_percentage
                                                )}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-600">
                                                Current: {index.price} USD
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Change:{" "}
                                                {index.change_percentage.toFixed(
                                                    2
                                                )}
                                                %
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <h2 className="text-xl font-semibold mt-8 mb-4">
                                Sector Performance
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {marketData.sectors.map((sector) => (
                                    <Card key={sector.name}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                {sector.name}
                                                {renderPerformance(
                                                    sector.performance
                                                )}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-600">
                                                Performance:{" "}
                                                {sector.performance.toFixed(2)}%
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default MarketOverview;
