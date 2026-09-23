# Internal lookup and decision guide

```mermaid
flowchart TD
    A["Identify the noun's meaning"] --> B{"Noun compound?"}
    B -->|Yes| C["Look up the final noun"]
    B -->|No| D{"Reliable derivational pattern?"}
    D -->|Yes| E["Check its scope and exceptions"]
    D -->|No| F["Use internal lexical lookup"]
    C --> G["Save article, meaning and plural"]
    E --> F
    F --> G
    G --> H["Choose case from the sentence"]
    H --> I["Apply article, adjective and noun endings"]
```

If only a tendency is available, mark the guess and verify it in the internal lexicon before treating it as a learned fact. Required course nouns must already have complete entries. Add a corrected personal review card after a mistake; no external dictionary or Anki installation is required.
