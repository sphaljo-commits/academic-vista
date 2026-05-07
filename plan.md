# Plan: Revert Portal Theme to Previous Version

## 1. Create/Restore `src/portal-theme.css`
- Restore the elaborate portal styling including gradients, glassmorphism, and generous spacing.
- Define global portal classes: `.portal-layout`, `.portal-sidebar`, `.portal-card`, `.portal-header`.
- Use a palette that feels more "premium" (gradients and shadows) rather than the "simplified" current look.

## 2. Update `src/main.tsx`
- Import `src/portal-theme.css` to ensure styles are available globally.

## 3. Update `src/components/layout/DashboardLayout.tsx`
- Apply the new portal theme classes.
- Ensure the sidebar uses a more elaborate design (gradient background, better icons).
- Preserve the existing logout button functionality and positioning.

## 4. Update Dashboards (Admin, Teacher, Accountant)
- Ensure they use the updated layout and card styles.
- Maintain the color coding (Blue for Admin, Emerald for Teacher, Indigo for Accountant) but with more visual depth.

## 5. Verify Logout Button
- Confirm the logout button in both `DashboardLayout.tsx` and `Navbar.tsx` is still present and working.
