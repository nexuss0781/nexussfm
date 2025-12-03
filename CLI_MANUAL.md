# Nexuss CLI Manual

The **Nexuss Command-Line Interface (CLI)** allows you to manage your files directly from your terminal, providing a powerful, git-like workflow for project management.

---

## 📥 Installation

### Quick Install

**Windows (PowerShell)**:
```powershell
Invoke-WebRequest -Uri "https://nexussfm.onrender.com/download/client" -OutFile "nexuss.py"
pip install requests
```

**Linux/Mac**:
```bash
curl -L -O https://nexussfm.onrender.com/download/client
mv client nexuss.py
pip3 install requests
```

### Automated Installation

**Linux/Mac**:
```bash
curl -sSL https://nexussfm.onrender.com/static/install.sh | bash
```

**Windows (PowerShell)**:
```powershell
iwr -useb https://nexussfm.onrender.com/static/install.ps1 | iex
```

---

## 🔑 Authentication

### Login

Before using the CLI, you must authenticate:

```bash
python nexuss.py login your@email.com yourpassword
```

**Example**:
```bash
python nexuss.py login john@company.com MySecurePass123
```

Your authentication token is saved securely in `~/.filevault_config.json`. You stay logged in across sessions!

### Check Current User

```bash
python nexuss.py whoami
```

---

## 📤 Commands Reference

### `push` - Push Entire Project

Stage and upload all files in the current directory (like `git push`):

```bash
python nexuss.py push
```

**What it does**:
1. Scans your current directory recursively
2. Shows you all files that will be uploaded
3. Uploads everything to the server

**Example**:
```bash
cd /my-project
python nexuss.py push
```

**Output**:
```
🔍 Assessing project content...
   Found 15 files (2.4 MB)
   Staged for upload: All files

🚀 Pushing to remote server...
✓ Uploaded src/main.py
✓ Uploaded src/utils.py
✓ Uploaded README.md
...
✅ Push complete! All files are safely on the server.
```

---

### `upload` - Upload Specific Files

Upload one or more specific files with wildcard support:

**Single file**:
```bash
python nexuss.py upload document.pdf
```

**Multiple files**:
```bash
python nexuss.py upload file1.txt file2.pdf image.png
```

**Wildcards** (all PDFs):
```bash
python nexuss.py upload *.pdf
```

**Recursive wildcards** (all Python files in subdirectories):
```bash
python nexuss.py upload **/*.py
```

**Upload to specific folder**:
```bash
python nexuss.py upload *.txt --folder-id 5
```

---

### `upload-dir` - Upload Directory

Upload an entire directory with all its contents:

```bash
python nexuss.py upload-dir ./my-folder
```

**Recursive upload** (includes subdirectories):
```bash
python nexuss.py upload-dir ./project --recursive
```

**Upload to specific folder**:
```bash
python nexuss.py upload-dir ./docs --folder-id 10
```

---

### `list` - List Files

View your files and folders:

**List root directory**:
```bash
python nexuss.py list
```

**List specific folder**:
```bash
python nexuss.py list --folder-id 5
```

**Example Output**:
```
📁 Folders:
  [ID: 3] Documents (5 items)
  [ID: 8] Projects (12 items)

📄 Files:
  [ID: 15] report.pdf (2.5 MB)
  [ID: 23] presentation.pptx (5.1 MB)
```

---

### `download` - Download File

Download a file by its ID:

```bash
python nexuss.py download 15
```

**Save with custom name**:
```bash
python nexuss.py download 15 --output my-report.pdf
```

---

### `mkdir` - Create Folder

Create a new folder:

```bash
python nexuss.py mkdir "Project Files"
```

**Create inside another folder**:
```bash
python nexuss.py mkdir "Subfolder" --parent-id 5
```

---

## 🎯 Common Workflows

### Workflow 1: Upload a New Project

```bash
# 1. Navigate to your project
cd /path/to/my-project

# 2. Login (if not already)
python nexuss.py login user@example.com password

# 3. Push entire project
python nexuss.py push
```

### Workflow 2: Update Specific Files

```bash
# Upload only changed documentation
python nexuss.py upload README.md CHANGELOG.md

# Upload all new images
python nexuss.py upload images/*.png
```

### Workflow 3: Organize Files

```bash
# 1. Create a folder
python nexuss.py mkdir "Reports 2024"

# Output shows: Created folder ID: 12

# 2. Upload files to that folder
python nexuss.py upload *.pdf --folder-id 12
```

### Workflow 4: Download Files

```bash
# 1. List files to find IDs
python nexuss.py list

# 2. Download specific file
python nexuss.py download 25 --output backup/important.docx
```

---

## 🔧 Advanced Usage

### Environment Variables

Set the server URL (optional):
```bash
export FILE VAULT_SERVER=https://nexussfm.onrender.com
python nexuss.py login user@example.com pass
```

### Configuration File

Your settings are stored in `~/.filevault_config.json`:
```json
{
  "server_url": "https://nexussfm.onrender.com",
  "access_token": "eyJ0eXAiOiJKV...",
  "user": {
    "id": 1,
    "username": "john",
    "email": "john@example.com"
  }
}
```

### Troubleshooting

**"Authentication required"**:
```bash
# Login again
python nexuss.py login your@email.com password
```

**"Connection error"**:
- Check your internet connection
- Verify the server is running: https://nexussfm.onrender.com
- Check your firewall settings

**"File not found" during upload**:
- Verify the file path is correct
- Use absolute paths if needed: `/full/path/to/file.txt`

---

## 📋 Command Summary

| Command | Description | Example |
|---------|-------------|---------|
| `login` | Authenticate to server | `python nexuss.py login user@email.com pass` |
| `push` | Upload all project files | `python nexuss.py push` |
| `upload` | Upload specific files | `python nexuss.py upload *.pdf` |
| `upload-dir` | Upload directory | `python nexuss.py upload-dir ./folder` |
| `list` | List files/folders | `python nexuss.py list --folder-id 5` |
| `download` | Download file | `python nexuss.py download 15` |
| `mkdir` | Create folder | `python nexuss.py mkdir "New Folder"` |
| `whoami` | Show current user | `python nexuss.py whoami` |

---

## 💡 Pro Tips

1. **Use `push` for entire projects**: It's the fastest way to backup/upload a complete project.
2. **Wildcards save time**: `*.pdf` uploads all PDFs at once.
3. **Save folder IDs**: When you create folders, note their IDs for future uploads.
4. **Stay logged in**: Your token persists, so you only need to login once.
5. **Combine with scripts**: Automate backups by creating shell scripts.

---

## 🔐 Security Notes

- **Never share your token**: The config file contains sensitive authentication data.
- **Use strong passwords**: Minimum 6 characters, use letters, numbers, and symbols.
- **HTTPS only**: All communication with the server is encrypted.
- **Logout on shared machines**: Delete `~/.filevault_config.json` when done.

---

*Nexuss CLI v1.0.0*  
*For web interface documentation, see [User Guide](USER_GUIDE.md)*
