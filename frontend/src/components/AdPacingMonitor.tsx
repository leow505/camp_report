import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Typography, Box } from '@mui/material';

interface AdPacingMonitorProps {
    historicalData?: { timestamp: string; spend: number }[];
}

const AdPacingMonitor: React.FC<AdPacingMonitorProps> = ({ historicalData = [] }) => {
    const options: Highcharts.Options = {
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            style: {
                fontFamily: 'Inter, system-ui, sans-serif'
            },
            height: 380
        },
        title: {
            text: undefined
        },
        xAxis: {
            categories: historicalData.map(d => new Date(d.timestamp).toLocaleTimeString()),
            labels: { style: { color: '#64748b', fontSize: '10px' } },
            gridLineWidth: 0,
            lineColor: '#e2e8f0'
        },
        yAxis: {
            title: { text: undefined },
            labels: { style: { color: '#64748b' } },
            gridLineColor: '#f1f5f9',
        },
        tooltip: {
            backgroundColor: '#ffffff',
            borderColor: '#e2e8f0',
            style: { color: '#0f172a' },
            shared: true,
            borderRadius: 12,
            shadow: true
        },
        series: [{
            name: 'Historical Spend',
            type: 'areaspline',
            data: historicalData.map(d => d.spend),
            color: '#6366f1',
            fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, 'rgba(99, 102, 241, 0.1)'],
                    [1, 'rgba(99, 102, 241, 0)']
                ]
            },
            lineWidth: 3,
            marker: { enabled: false, states: { hover: { enabled: true } } }
        }],
        legend: {
            itemStyle: { color: '#64748b', fontWeight: 'bold', fontSize: '11px' },
            align: 'right',
            verticalAlign: 'top',
            layout: 'horizontal',
            y: -10
        },
        credits: { enabled: false }
    };

    return (
        <Card sx={{ p: 4, borderRadius: 6, flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Historical Spend Chart</Typography>
            </Box>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </Card>
    );
};

export default AdPacingMonitor;
