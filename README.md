# Ads Portal Campaign Report - Performance Benchmark

This project demonstrates the transition from a **monolithic, blocking frontend** to a **decoupled, streaming-priority UI**.

## The Situation (Branch: `main`)
Currently, on the `main` branch, the application suffers from a significant loading bottleneck.

- **The Problem**: When an account manager opens a campaign, they see a blank loading spinner for about **5 seconds**.
- **The Cause**: The frontend uses `Promise.all` to wait for all data (Campaign Info, Spend Charts, Pacing, and Audit Logs) before rendering *anything*. The slowest API (Audit Logs at 5s) holds the entire page hostage.
- **The Impact**: During live incidents (like overspending), this delay feels like an eternity and makes the tool feel broken.

### How to Run
1. **Start Backend**: `cd backend && npm run dev` (Runs on port 3000 with simulated slow endpoints)
2. **Start Frontend**: `cd frontend && npm run dev` (Runs on port 5173)

---

## The Solution (Branch: `solution`)
I have refactored the application to use **React Query** and **Skeleton States** to make the page feel instant.

### Key Optimizations:
- **Decoupled Requests**: No more `Promise.all`. Data segments load independently.
- **Prioritized "First View"**: The Layout and Campaign Header appear in < 300ms.
- **High-Stakes Streaming**: Crucial Pacing/Spend data loads in < 1s.
- **Background Loading**: Heavy historical charts and logs trickle in later without blocking the user.
- **Smart Caching**: Subsequent campaign views are instant.

---

## Comparison Summary
| Metric | `main` (Bottleneck) | `solution` (Optimized) |
| :--- | :--- | :--- |
| **First Paint** | ~5 seconds | < 1 second |
| **User Feedback** | Global Spinner | Segmented Skeletons |
| **UX Feel** | "Broken/Frozen" | "Ready to work" |
