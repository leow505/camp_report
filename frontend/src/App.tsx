import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Container,
  alpha,
  CircularProgress,
  Stack
} from '@mui/material';
import {
  LayoutDashboard,
  ChevronRight,
  History,
  Info
} from 'lucide-react';
import AdPacingMonitor from './components/AdPacingMonitor';
import axios from 'axios';

const drawerWidth = 280;

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    campaign: any;
    pacing: any;
    charts: any;
    logs: any;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // THE BOTTLENECK: Waiting for everything before rendering
        const [campaign, pacing, charts, logs] = await Promise.all([
          axios.get('http://localhost:3000/api/campaign'),
          axios.get('http://localhost:3000/api/pacing'),
          axios.get('http://localhost:3000/api/charts'),
          axios.get('http://localhost:3000/api/logs')
        ]);

        setData({
          campaign: campaign.data,
          pacing: pacing.data,
          charts: charts.data,
          logs: logs.data
        });
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 3,
        bgcolor: 'background.default'
      }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="text.secondary" fontWeight={600}>
          Loading Campaign Data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            px: 2,
            py: 4,
            display: 'flex',
            flexDirection: 'column'
          },
        }}
      >
        <Box sx={{ px: 2, mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            width: 44,
            height: 44,
            bgcolor: 'primary.main',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.3)'
          }}>
            <LayoutDashboard size={24} color="white" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontSize: '1.1rem', lineHeight: 1, fontWeight: 700 }}>Campaigns</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, fontSize: '0.65rem' }}>
              Ads Portal
            </Typography>
          </Box>
        </Box>

        <List sx={{ px: 0 }}>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={true}
              sx={{
                borderRadius: 3,
                py: 1.5,
                px: 2,
                '&.Mui-selected': {
                  bgcolor: alpha('#6366f1', 0.08),
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                  '&:hover': { bgcolor: alpha('#6366f1', 0.12) },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                <LayoutDashboard size={20} />
              </ListItemIcon>
              <ListItemText
                primary="Ad Pacing"
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 700
                }}
              />
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', borderBottom: '1px solid', borderColor: 'divider', color: 'text.primary' }}>
          <Toolbar sx={{ px: '40px !important', height: 80 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Marketing</Typography>
                <ChevronRight size={12} color="#94a3b8" />
                <Typography variant="caption" color="primary" fontWeight={700} sx={{ textTransform: 'uppercase' }}>
                  {data?.campaign?.name || 'Campaign'}
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Status: {data?.campaign?.status}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 6, px: '40px !important' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { lg: '2fr 1fr' }, gap: 4 }}>
              <AdPacingMonitor historicalData={data?.charts?.historicalData} />

              <Stack gap={4}>
                <Paper sx={{ p: 4, borderRadius: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 2, fontWeight: 800, mb: 4, display: 'block' }}>
                    Real-time Pacing
                  </Typography>
                  <List>
                    {[
                      { label: 'Current Spend', value: `$${data?.pacing?.currentSpend}`, trend: 'Live', color: 'primary.main' },
                      { label: 'Target Spend', value: `$${data?.pacing?.targetSpend}`, trend: 'Daily', color: 'text.secondary' },
                      { label: 'Pacing Efficiency', value: data?.pacing?.efficiency, trend: 'Normal', color: 'success.main' },
                    ].map((stat, i) => (
                      <ListItem key={i} sx={{ px: 0, py: 2, borderBottom: i < 2 ? '1px solid' : 'none', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>{stat.label}</Typography>
                          <Typography variant="h5" fontWeight={800} color={stat.color}>{stat.value}</Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                <Paper sx={{ p: 4, borderRadius: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <History size={18} color="#64748b" />
                    <Typography variant="subtitle2" fontWeight={800} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                      Audit Logs
                    </Typography>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {data?.logs?.map((log: any, i: number) => (
                      <ListItem key={log.id} sx={{ px: 0, py: 1.5, borderBottom: i < data.logs.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2" fontWeight={700}>{log.action}</Typography>
                            <Typography variant="caption" color="text.secondary">{log.time}</Typography>
                          </Box>
                          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                            <Info size={12} /> by {log.user}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
