# React Query & Form Architecture Guide

## Overview

This project implements industrial-standard frontend architecture using React Query for API state management and React Hook Form with Zod for robust form validation. The architecture follows atomic design principles and separation of concerns for maximum scalability and maintainability.

## Architecture Decisions

### 1. API Layer Architecture

**Layered API Service Pattern:**
- `src/lib/api/base.js` - Base HTTP client and common utilities
- `src/lib/api/services/` - Domain-specific API services
- `src/lib/api/mockData.js` - Mock data for development

**Benefits:**
- **Separation of Concerns**: Each service handles one domain
- **Testability**: Easy to mock individual services
- **Error Handling**: Centralized error normalization
- **Type Safety**: Consistent API response types

### 2. React Query Hook Architecture

**Atomic Hooks Pattern:**
- One hook per operation (useCreateUser, useUpdateProfile)
- Query key factory for consistent caching
- Optimistic updates with rollback support

**File Structure:**
```
src/hooks/query/
├── useCampaigns.js    # Campaign-related operations
├── useParticipants.js # Participant CRUD operations
└── index.js           # Centralized exports
```

**Benefits:**
- **Single Responsibility**: Each hook has one purpose
- **Cache Efficiency**: Granular cache invalidation
- **Optimistic UX**: Immediate feedback with rollback
- **Error Boundaries**: Isolated error handling

### 3. Form Architecture

**Custom Form Hooks:**
- Encapsulate form logic, validation, and submission
- Reusable across components
- Real-time validation with Zod schemas

**File Structure:**
```
src/hooks/forms/
├── useJoinCampaignForm.js
├── useAddCountForm.js
└── index.js

src/components/forms/
├── JoinCampaignForm.jsx
├── AddCountForm.jsx
└── ...

src/lib/validation/
└── schemas.js         # Centralized Zod schemas
```

**Benefits:**
- **Reusability**: Form logic separated from UI
- **Testability**: Hooks can be tested independently
- **Validation**: Centralized schema definitions
- **Accessibility**: Built-in ARIA attributes

### 4. Query Key Strategy

**Factory Pattern:**
```javascript
export const queryKeys = {
  campaigns: () => ['campaigns'],
  campaign: (id) => ['campaign', id],
  campaignStats: (id) => ['campaign-stats', id],
  participants: () => ['participants'],
  leaderboard: () => ['leaderboard'],
};
```

**Cache Invalidation Strategy:**
- Precise invalidation based on data relationships
- Optimistic updates for immediate feedback
- Rollback mechanism for error scenarios

## Implementation Examples

### Query Hook Example

```javascript
export const useCreateParticipant = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: participantService.createParticipant,
    onMutate: async (newParticipant) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: queryKeys.participants() });
      const previousData = queryClient.getQueryData(queryKeys.participants());

      queryClient.setQueryData(queryKeys.participants(), (old) =>
        old ? [...old, { ...newParticipant, id: 'temp' }] : [newParticipant]
      );

      return { previousData };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.participants() });
      toast({ title: "Success!", description: "Participant added." });
    },
    onError: (error, variables, context) => {
      // Rollback optimistic update
      queryClient.setQueryData(queryKeys.participants(), context.previousData);
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });
};
```

### Form Hook Example

```javascript
export const useJoinCampaignForm = () => {
  const navigate = useNavigate();
  const createParticipant = useCreateParticipant();

  const form = useForm({
    resolver: zodResolver(formSchemas.joinCampaign),
    mode: "onChange", // Real-time validation
  });

  const handleSubmit = async (data) => {
    try {
      await createParticipant.mutateAsync(data);
      form.reset();
      setTimeout(() => navigate("/add-count"), 2000);
    } catch (error) {
      console.error("Failed to join campaign:", error);
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(handleSubmit),
    isSubmitting: createParticipant.isPending,
    isFieldInvalid: (field) => !!(form.getFieldState(field).invalid && form.getFieldState(field).isTouched),
  };
};
```

### Validation Schema Example

```javascript
export const joinCampaignSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, "Name can only contain letters and spaces"),
});
```

## Testing Strategy

### Unit Testing Hooks

```javascript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateParticipant } from '@/features/participants';

describe('useCreateParticipant', () => {
  it('should create participant successfully', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
    });

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCreateParticipant(), { wrapper });

    act(() => {
      result.current.mutate({ name: 'Test User' });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
```

### Integration Testing Forms

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { JoinCampaignForm } from '@/components/forms/JoinCampaignForm';

describe('JoinCampaignForm', () => {
  it('should validate and submit form', async () => {
    render(<JoinCampaignForm />);

    const nameInput = screen.getByLabelText(/your name/i);
    const submitButton = screen.getByRole('button', { name: /join campaign/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/joining.../i)).toBeInTheDocument();
    });
  });
});
```

## Scalability Considerations

### 1. Code Organization
- **Domain-driven structure**: Group by feature, not by file type
- **Barrel exports**: Centralized imports via index files
- **Atomic components**: Small, focused, reusable components

### 2. Performance Optimizations
- **Query deduplication**: React Query prevents duplicate requests
- **Background refetching**: Keep data fresh automatically
- **Optimistic updates**: Immediate UI feedback
- **Selective invalidation**: Only update relevant cache entries

### 3. Maintainability Features
- **TypeScript support**: Ready for type safety migration
- **Schema validation**: Centralized with Zod
- **Error boundaries**: Isolated error handling
- **Consistent patterns**: Predictable code structure

## Migration Path

### From Current Implementation
1. **Phase 1**: Replace API calls with new service layer
2. **Phase 2**: Migrate to atomic query hooks
3. **Phase 3**: Implement form hooks and components
4. **Phase 4**: Add comprehensive testing
5. **Phase 5**: TypeScript migration (optional)

### Breaking Changes
- Import paths change from `@/hooks/query` to `@/features/{domain}`
- Form components now use custom hooks instead of inline logic
- API responses normalized through service layer

## Best Practices

### Query Hooks
- Use atomic hooks for single operations
- Implement optimistic updates for better UX
- Always handle error cases with user feedback
- Use query keys factory for consistency

### Form Hooks
- Separate form logic from UI components
- Use real-time validation with mode: "onChange"
- Implement proper accessibility attributes
- Centralize validation schemas

### Error Handling
- Normalize errors in API service layer
- Provide user-friendly error messages
- Implement rollback for optimistic updates
- Use toast notifications for feedback

## Conclusion

This architecture provides a solid foundation for scaling React applications with:
- **Maintainable code**: Clear separation of concerns
- **Type safety**: Ready for TypeScript migration
- **Performance**: Optimistic updates and efficient caching
- **Testing**: Hooks and components easily testable
- **Developer experience**: Consistent patterns and good tooling support