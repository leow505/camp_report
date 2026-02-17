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
  alpha
} from '@mui/material';
import {
  LayoutDashboard,
  ChevronRight
} from 'lucide-react';
import AdPacingMonitor from './components/AdPacingMonitor';

const drawerWidth = 280;

const App: React.FC = () => {
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
              Analytics Portal
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
                  Ad Pacing
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Monitor Pacing
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 6, px: '40px !important' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { lg: '2fr 1fr' }, gap: 4 }}>
              <AdPacingMonitor />
              <Paper sx={{ p: 4, borderRadius: 6 }}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 2, fontWeight: 800, mb: 4, display: 'block' }}>
                  Performance Highlights
                </Typography>
                <List>
                  {[
                    { label: 'Current Spend', value: '$1,250.40', trend: '+12%', color: 'primary.main' },
                    { label: 'Pacing Efficiency', value: '82.5%', trend: 'Normal', color: 'success.main' },
                    { label: 'Impressions', value: '4.2M', trend: '+2.4%', color: 'text.primary' },
                    { label: 'Conversion Rate', value: '1.24%', trend: '-0.2%', color: 'text.secondary' },
                  ].map((stat, i) => (
                    <ListItem key={i} sx={{ px: 0, py: 2, borderBottom: i < 3 ? '1px solid' : 'none', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>{stat.label}</Typography>
                        <Typography variant="h5" fontWeight={800} color={stat.color}>{stat.value}</Typography>
                      </Box>
                      <Box sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: stat.trend.startsWith('+') ? alpha('#10b981', 0.1) : alpha('#94a3b8', 0.1),
                        color: stat.trend.startsWith('+') ? 'success.main' : 'text.secondary'
                      }}>
                        <Typography variant="caption" fontWeight={700}>{stat.trend}</Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
