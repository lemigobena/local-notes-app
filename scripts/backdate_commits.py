import subprocess
import datetime
import random
import os

def run_git_commit(message, date):
    env = os.environ.copy()
    date_str = date.strftime('%Y-%m-%dT%H:%M:%S')
    env['GIT_AUTHOR_DATE'] = date_str
    env['GIT_COMMITTER_DATE'] = date_str
    
    subprocess.run(['git', 'add', '.'], check=True)
    subprocess.run(['git', 'commit', '-m', message], env=env, check=True)

def generate_history(start_date, end_date):
    current_date = start_date
    delta = datetime.timedelta(days=1)
    
    messages = [
        "docs: update documentation",
        "feat: add core functionality",
        "fix: resolve minor bugs",
        "refactor: clean up code structure",
        "style: improve UI aesthetics",
        "perf: optimize performance",
        "test: add unit tests",
        "chore: update dependencies",
        "feat: implement local storage layer",
        "feat: add encryption engine",
        "feat: implement sync logic",
        "feat: add markdown rendering",
        "style: update themes and colors",
        "fix: address conflict resolution edge cases"
    ]
    
    while current_date <= end_date:
        num_commits = random.randint(1, 8)
        for i in range(num_commits):
            # Distribute commits throughout the day
            hour = random.randint(9, 21)
            minute = random.randint(0, 59)
            second = random.randint(0, 59)
            commit_date = current_date.replace(hour=hour, minute=minute, second=second)
            
            msg = random.choice(messages)
            if i == 0:
                msg = f"Work for {current_date.strftime('%Y-%m-%d')}"
            
            # In a real scenario, we'd modify files here. 
            # For this automation, we just commit whatever is staged.
            run_git_commit(f"{msg} ({i+1}/{num_commits})", commit_date)
            
        current_date += delta

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 3:
        print("Usage: python backdate_commits.py <start_date_YYYY-MM-DD> <end_date_YYYY-MM-DD>")
        sys.exit(1)
    
    start_str = sys.argv[1]
    end_str = sys.argv[2]
    
    start = datetime.datetime.strptime(start_str, '%Y-%m-%d')
    end = datetime.datetime.strptime(end_str, '%Y-%m-%d')
    
    generate_history(start, end)
    print(f"Generated commits from {start_str} to {end_str}")
