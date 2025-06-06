# MCP (Model Context Protocol) Implementation Guide

## Overview

This document describes the implementation of MCP (Model Context Protocol) functionality in the Chrome extension's virtual character/mascot feature. The MCP system enables automated web research tasks through the AI character, allowing users to request research assistance and receive automated search results.

## Architecture

### Core Components

1. **MCP Service** (`chrome-extension/src/services/mcpService.ts`)
   - Main service for handling MCP protocol operations
   - Detects research requests in user messages
   - Executes automated search tasks
   - Formats results for display

2. **Task Manager** (`chrome-extension/src/tasks/taskManager.ts`)
   - Manages task execution lifecycle
   - Handles concurrent task limits
   - Provides progress tracking and event emission
   - Manages task cancellation

3. **Storage Layer** (`packages/storage/lib/impl/mcpConfigStorage.ts`)
   - Configuration storage for MCP settings
   - Task history storage
   - Site configuration management

4. **UI Components**
   - **TaskSelector** (`packages/ui/lib/components/VirtualCharacter/TaskSelector.tsx`)
   - **TaskProgress** (`packages/ui/lib/components/VirtualCharacter/TaskProgress.tsx`)
   - **Enhanced ChatDialog** with task integration

### Data Flow

```
User Message → Character Manager → MCP Service → Task Manager → Search Execution → Results Display
```

## Features

### 1. Automatic Research Detection

The system automatically detects research requests in user messages using keyword analysis:

- **Research Keywords**: 研究, 搜索, 查找, 寻找, 帮我找, 需要, 论文, research, search, find, etc.
- **Academic Keywords**: 论文, 学术, 研究, 期刊, paper, academic, journal, arxiv
- **Code Keywords**: 代码, 库, 项目, 开源, code, library, project, github, repository

### 2. Task Types

- **Academic Research** (`research_papers`): Searches academic papers and research materials
- **Code Search** (`code_search`): Searches code repositories and technical resources  
- **General Research** (`general_research`): Comprehensive search across multiple sources

### 3. Search Sites Configuration

Default configured sites:
- **ArXiv**: Academic papers and preprints
- **GitHub**: Code repositories and projects
- **Google Scholar**: Academic literature (disabled by default)

### 4. User Interface

#### Task Selector Modal
- Displays available task types with descriptions
- Query input with auto-suggestion
- Configurable result limits
- Task-specific site information

#### Task Progress Modal
- Real-time progress tracking
- Status indicators and animations
- Task cancellation capability
- Error handling and display

#### Enhanced Chat Dialog
- Automatic research detection
- Task button for manual task selection
- Integrated result display
- Conversation persistence

## Configuration

### MCP Configuration Structure

```typescript
type MCPConfig = {
  enabled: boolean;                    // Enable/disable MCP functionality
  defaultStrategy: ResearchStrategy;   // Default research strategy
  maxConcurrentTasks: number;         // Maximum concurrent tasks
  taskTimeout: number;                // Task timeout in seconds
  autoExecute: boolean;               // Auto-execute detected tasks
  saveResults: boolean;               // Save results to history
  tasks: TaskConfig[];               // Available task configurations
  customSites: SearchSiteConfig[];   // Custom search sites
};
```

### Task Configuration

```typescript
type TaskConfig = {
  id: string;                        // Unique task identifier
  type: MCPTaskType;                // Task type
  name: string;                     // Display name
  description: string;              // Task description
  enabled: boolean;                 // Enable/disable task
  maxResults: number;               // Maximum results to collect
  timeout: number;                  // Task timeout in seconds
  retryAttempts: number;           // Number of retry attempts
  customPrompt?: string;           // Custom AI prompt
  sites: SearchSiteConfig[];       // Search sites for this task
};
```

## Usage Examples

### 1. Automatic Research Detection

User input: "帮我找一些关于[automated annotation]的研究论文"

System response:
1. Detects research request
2. Extracts query: "automated annotation"
3. Suggests task: "research_papers"
4. Shows task selector with pre-filled information

### 2. Manual Task Selection

1. User clicks the 🤖 button in chat input
2. Task selector modal opens
3. User selects task type and enters query
4. Task executes with progress tracking
5. Results displayed in chat

### 3. Result Display Format

```
✅ 研究任务完成！

找到 5 个相关结果：

1. **Automated Annotation of Scientific Papers - Result 1 from ArXiv**
   来源: ArXiv
   描述: This is a research paper about automated annotation...
   链接: https://arxiv.org/search/?q=automated+annotation&result=1

2. **GitHub Repository for Annotation Tools - Result 1 from GitHub**
   来源: GitHub
   描述: Open source tools for automated annotation...
   链接: https://github.com/search?q=automated+annotation&result=1
```

## Integration Points

### Character Manager Integration

The character manager (`pages/content-runtime/src/characterManager.ts`) has been extended with:

- MCP service initialization
- Task execution handling
- Research request detection
- Result formatting and display

### Storage Integration

- MCP configuration stored in `mcp-config-storage-key`
- Task history stored in `mcp-task-history-storage-key`
- Integrated with existing character storage system

### UI Integration

- Task components integrated into virtual character dialog
- Consistent theming with existing UI components
- Responsive design for different screen sizes

## Current Limitations

### 1. Mock Search Implementation

The current implementation uses mock search results for demonstration purposes. In a production environment, this would need to be replaced with:

- Real web scraping capabilities
- API integrations with search services
- Content parsing and extraction

### 2. Search Site Limitations

- Limited to predefined search sites
- No dynamic site discovery
- Basic selector-based configuration

### 3. Result Processing

- Simple text-based result formatting
- No advanced content analysis
- Limited metadata extraction

## Future Enhancements

### 1. Real Web Automation

- Implement actual web scraping using browser automation
- Add support for JavaScript-heavy sites
- Implement anti-bot detection handling

### 2. Advanced Search Strategies

- Semantic search capabilities
- Result relevance scoring
- Duplicate detection and filtering

### 3. Enhanced UI Features

- Result export functionality
- Advanced filtering and sorting
- Visual result previews

### 4. API Integrations

- Direct API integrations with research databases
- Academic search engine APIs
- Code repository APIs

## Development Notes

### Building and Testing

```bash
# Build the project
npm run build

# The MCP functionality is included in the build output
# Test by loading the extension in Chrome and using the virtual character
```

### Key Files Modified

- `chrome-extension/src/constants/index.ts` - Added MCP storage keys
- `packages/storage/lib/impl/index.ts` - Added MCP storage exports
- `packages/ui/lib/components/VirtualCharacter/ChatDialog.tsx` - Enhanced with task integration
- `packages/ui/lib/components/VirtualCharacter/VirtualCharacter.tsx` - Added task execution handler
- `pages/content-runtime/src/characterManager.ts` - Added MCP integration

### Configuration Access

MCP configuration can be accessed through the extension's storage system:

```typescript
import { mcpConfigStorage } from '@extension/storage';

// Get current configuration
const config = await mcpConfigStorage.get();

// Enable MCP
await mcpConfigStorage.enableMCP(true);

// Update task configuration
await mcpConfigStorage.updateTask('research_papers', { maxResults: 30 });
```

## Conclusion

The MCP implementation provides a solid foundation for automated research capabilities within the Chrome extension's virtual character system. While the current implementation uses mock data, the architecture is designed to support real web automation and API integrations in future iterations.

The modular design allows for easy extension and customization of task types, search strategies, and result processing, making it a flexible platform for various research and automation needs.
