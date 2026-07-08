import sys
import subprocess

try:
    import pypdf
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    import pypdf

reader = pypdf.PdfReader(r"c:\Users\laksh\OneDrive\Pictures\Documents\Desktop\2026_02_01_Arbeitsvertrag_Lakshay_Trehan_DRAFT.pdf")
print("Total Pages:", len(reader.pages))
for i, page in enumerate(reader.pages):
    print(f"--- PAGE {i+1} ---")
    print(page.extract_text())
