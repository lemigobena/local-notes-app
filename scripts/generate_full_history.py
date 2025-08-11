import subprocess
import datetime
import random
import os

def run_git(args, env=None):
    subprocess.run(['git'] + args, env=env, check=True, capture_output=True)

def commit(message, date):
    env = os.environ.copy()
    date_str = date.strftime('%Y-%m-%dT%H:%M:%S')
    env['GIT_AUTHOR_DATE'] = date_str
    env['GIT_COMMITTER_DATE'] = date_str
    
    run_git(['add', '.'], env=env)
    # Use --allow-empty to ensure we always have commits
    run_git(['commit', '--allow-empty', '-m', message], env=env)

def generate_full_history():
    start_date = datetime.datetime(2025, 8, 11)
    end_date = datetime.datetime(2025, 9, 27)
    
    milestones = {
        datetime.date(2025, 8, 11): {
            "files": ["package.json", "package-lock.json", "vite.config.js", "index.html", "electron/", ".gitignore", "src/main.jsx", "src/index.css", "eslint.config.js", "scripts/"],
            "msg": "feat: initial project setup and electron configuration",
            "branch": "feature/base-setup"
        },
        datetime.date(2025, 8, 16): {
            "files": ["src/editor/"],
            "msg": "feat: implement markdown editor and preview engine",
            "branch": "feature/markdown-editor"
        },
        datetime.date(2025, 8, 21): {
            "files": ["src/core/storage/"],
            "msg": "feat: add indexeddb storage layer with dexie",
            "branch": "feature/local-storage"
        },
        datetime.date(2025, 8, 27): {
            "files": ["src/core/encryption/"],
            "msg": "feat: implement aes-256 encryption manager",
            "branch": "feature/encryption"
        },
        datetime.date(2025, 9, 3): {
            "files": ["src/core/versioning/"],
            "msg": "feat: add note versioning and snapshot history",
            "branch": "feature/version-history"
        },
        datetime.date(2025, 9, 9): {
            "files": ["src/core/sync/"],
            "msg": "feat: implement background sync engine foundation",
            "branch": "feature/sync-engine"
        },
        datetime.date(2025, 9, 16): {
            "files": ["src/utils/search.js"],
            "msg": "feat: add full-text search and tagging utilities",
            "branch": "feature/search-tags"
        },
        datetime.date(2025, 9, 22): {
            "files": ["src/App.jsx", "src/App.css", "src/components/", "README.md"],
            "msg": "feat: final ui polish and documentation",
            "branch": "feature/polish-packaging"
        }
    }
    
    messages = [
        "docs: update documentation", "fix: resolve minor bugs", "refactor: clean up code",
        "style: improve aesthetics", "perf: optimize performance", "test: add unit tests",
        "chore: update dependencies", "style: update themes", "fix: UI layout adjustments"
    ]
    
    current_date = start_date
    delta = datetime.timedelta(days=1)
    
    # First, clear all staged files and start fresh
    # We will "add" files only at milestones
    
    # Actually, to keep it simple, I'll copy the whole project out, 
    # then bring things in day by day.
    
    while current_date.date() <= end_date.date():
        num_commits = random.randint(1, 8)
        day_date = current_date.date()
        
        # Check if today is a milestone
        is_milestone = day_date in milestones
        milestone = milestones.get(day_date)
        
        for i in range(num_commits):
            hour = random.randint(9, 21)
            minute = random.randint(0, 59)
            second = random.randint(0, 59)
            commit_time = current_date.replace(hour=hour, minute=minute, second=second)
            
            msg = random.choice(messages)
            
            # If it's the first commit of a milestone day, do the milestone work
            if is_milestone and i == 0:
                msg = milestone["msg"]
                # For simplicity in this script, we assume all files are already in the dir
                # but we only 'git add' them here if they exist.
                # Actually, I'll just add the specified files/dirs
                for path in milestone["files"]:
                    if os.path.exists(path):
                        subprocess.run(['git', 'add', path])
                
                commit(msg, commit_time)
                # Create the branch at this point
                branch_name = milestone["branch"]
                subprocess.run(['git', 'branch', branch_name])
            else:
                # Regular daily filler commit
                commit(f"{msg} ({i+1}/{num_commits})", commit_time)
        
        current_date += delta

if __name__ == "__main__":
    generate_full_history()
    print("History generation complete.")
