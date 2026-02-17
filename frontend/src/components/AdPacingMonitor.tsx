import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { addPacingData, type RootState } from '../store';
import { Card, Typography, Box } from '@mui/material';

const AdPacingMonitor: React.FC = () => {
    const dispatch = useDispatch();
    const pacingData = useSelector((state: RootState) => state.dashboard.pacingData);

    useEffect(() => {
        const socket = io('http://localhost:3000');

        socket.on('pacing_update', (data) => {
            dispatch(addPacingData(data));
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

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
            categories: pacingData.map(d => new Date(d.timestamp).toLocaleTimeString()),
            labels: { style: { color: '#64748b', fontSize: '10px' } },
            gridLineWidth: 0,
            lineColor: '#e2e8f0'
        },
        yAxis: {
            title: { text: undefined },
            labels: { style: { color: '#64748b' } },
            gridLineColor: '#f1f5f9',
            plotBands: [{
                from: 1400,
                to: 1600,
                color: 'rgba(99, 102, 241, 0.05)', // Indigo Zone (Ideal)
                label: {
                    text: 'Optimal Flow',
                    align: 'right',
                    x: -10,
                    style: { color: '#818cf8', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase' }
                }
            }]
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
            name: 'Actual Spend',
            type: 'areaspline',
            //@ts-ignore
            data: pacingData.map(d => d.spend),
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
        }, {
            name: 'Target Baseline',
            type: 'line',
            //@ts-ignore
            data: pacingData.map(d => d.targetSpend),
            dashStyle: 'Dash',
            color: '#94a3b8',
            lineWidth: 2,
            marker: { enabled: false }
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
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Live Ad Expenditure Pacing</Typography>
            </Box>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </Card>
    );
};

export default AdPacingMonitor;
