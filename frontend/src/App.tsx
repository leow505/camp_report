import React from 'react';
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
  Stack,
  Skeleton
} from '@mui/material';
import {
  LayoutDashboard,
  ChevronRight,
  History,
  Info
} from 'lucide-react';
import AdPacingMonitor from './components/AdPacingMonitor';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const drawerWidth = 280;

const App: React.FC = () => {
  // Decoupled requests using React Query
  const { data: campaign, isLoading: campaignLoading } = useQuery({
    queryKey: ['campaign'],
    queryFn: () => axios.get('http://localhost:3000/api/campaign').then(res => res.data),
    staleTime: 60000 // Cache for 1 minute
  });

  const { data: pacing, isLoading: pacingLoading } = useQuery({
    queryKey: ['pacing'],
    queryFn: () => axios.get('http://localhost:3000/api/pacing').then(res => res.data),
    staleTime: 30000
  });

  const { data: charts, isLoading: chartsLoading } = useQuery({
    queryKey: ['charts'],
    queryFn: () => axios.get('http://localhost:3000/api/charts').then(res => res.data),
    staleTime: 120000
  });

  const { data: logs, isLoading: logsLoading } = useQuery({
    queryKey: ['logs'],
    queryFn: () => axios.get('http://localhost:3000/api/logs').then(res => res.data),
    staleTime: 300000
  });

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar - Loads Instantly */}
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

      {/* Main Content - Structure renders instantly */}
      <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', borderBottom: '1px solid', borderColor: 'divider', color: 'text.primary' }}>
          <Toolbar sx={{ px: '40px !important', height: 80 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Marketing</Typography>
                <ChevronRight size={12} color="#94a3b8" />
                {campaignLoading ? (
                  <Skeleton width={100} height={20} />
                ) : (
                  <Typography variant="caption" color="primary" fontWeight={700} sx={{ textTransform: 'uppercase' }}>
                    {campaign?.name}
                  </Typography>
                )}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {campaignLoading ? <Skeleton width={200} /> : `Status: ${campaign?.status}`}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 6, px: '40px !important' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { lg: '2fr 1fr' }, gap: 4 }}>
              {/* Prioritize High-Stakes Data and Visual Feedback */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <AdPacingMonitor historicalData={charts?.historicalData} isLoading={chartsLoading} />
              </Box>

              <Stack gap={4}>
                <Paper sx={{ p: 4, borderRadius: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 2, fontWeight: 800, mb: 4, display: 'block' }}>
                    Real-time Pacing
                  </Typography>
                  <List>
                    {[
                      { label: 'Current Spend', value: pacing?.currentSpend ? `$${pacing.currentSpend}` : null, color: 'primary.main' },
                      { label: 'Target Spend', value: pacing?.targetSpend ? `$${pacing.targetSpend}` : null, color: 'text.secondary' },
                      { label: 'Pacing Efficiency', value: pacing?.efficiency, color: 'success.main' },
                    ].map((stat, i) => (
                      <ListItem key={i} sx={{ px: 0, py: 2, borderBottom: i < 2 ? '1px solid' : 'none', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>{stat.label}</Typography>
                          {pacingLoading ? (
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width="60%" />
                          ) : (
                            <Typography variant="h5" fontWeight={800} color={stat.color}>{stat.value}</Typography>
                          )}
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
                    {logsLoading ? (
                      [1, 2, 3].map((n) => (
                        <ListItem key={n} sx={{ px: 0, py: 1.5 }}>
                          <Box sx={{ width: '100%' }}>
                            <Skeleton variant="text" width="80%" />
                            <Skeleton variant="text" width="40%" />
                          </Box>
                        </ListItem>
                      ))
                    ) : (
                      logs?.map((log: any, i: number) => (
                        <ListItem key={log.id} sx={{ px: 0, py: 1.5, borderBottom: i < logs.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
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
                      ))
                    )}
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
