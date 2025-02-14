.
├── .cursorignore
├── .cursorrules
├── .env
├── .env.example
├── .gitignore
├── .vscode
│   └── tasks.json
├── README.md
├── app
│   ├── api
│   │   └── v1
│   │       └── endpoints
│   │           ├── groups.py
│   │           └── study_sessions.py
│   ├── crud
│   │   ├── base.py
│   │   ├── group.py
│   │   ├── study_session.py
│   │   └── word.py
│   └── services
│       ├── group_service.py
│       ├── study_service.py
│       └── word_service.py
├── ata
├── backend-fastapi
│   ├── .coverage
│   ├── .pytest_cache
│   │   ├── .gitignore
│   │   ├── CACHEDIR.TAG
│   │   ├── README.md
│   │   └── v
│   │       └── cache
│   │           ├── lastfailed
│   │           ├── nodeids
│   │           └── stepwise
│   ├── .venv
│   │   ├── .gitignore
│   │   ├── CACHEDIR.TAG
│   │   ├── bin
│   │   │   ├── activate
│   │   │   ├── activate.bat
│   │   │   ├── activate.csh
│   │   │   ├── activate.fish
│   │   │   ├── activate.nu
│   │   │   ├── activate.ps1
│   │   │   ├── activate_this.py
│   │   │   ├── alembic
│   │   │   ├── deactivate.bat
│   │   │   ├── dotenv
│   │   │   ├── email_validator
│   │   │   ├── fastapi
│   │   │   ├── httpx
│   │   │   ├── mako-render
│   │   │   ├── markdown-it
│   │   │   ├── pydoc.bat
│   │   │   ├── pygmentize
│   │   │   ├── python -> /home/gray/miniconda3/bin/python3
│   │   │   ├── python3 -> python
│   │   │   ├── python3.12 -> python
│   │   │   ├── typer
│   │   │   ├── uvicorn
│   │   │   └── watchfiles
│   │   ├── include
│   │   │   └── site
│   │   │       └── python3.12
│   │   │           └── greenlet
│   │   │               └── greenlet.h
│   │   ├── lib
│   │   │   └── python3.12
│   │   │       └── site-packages
│   │   │           ├── Mako-1.3.9.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── entry_points.txt
│   │   │           │   └── top_level.txt
│   │   │           ├── MarkupSafe-3.0.2.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE.txt
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── top_level.txt
│   │   │           ├── PyYAML-6.0.2.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── top_level.txt
│   │   │           ├── PyYAML.libs
│   │   │           ├── SQLAlchemy-2.0.38.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── top_level.txt
│   │   │           ├── __pycache__
│   │   │           │   ├── _virtualenv.cpython-312.pyc
│   │   │           │   └── typing_extensions.cpython-312.pyc
│   │   │           ├── _japanese_learning_portal.pth
│   │   │           ├── _virtualenv.pth
│   │   │           ├── _virtualenv.py
│   │   │           ├── _yaml
│   │   │           │   └── __init__.py
│   │   │           ├── aiosqlite
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __pycache__
│   │   │           │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   ├── __version__.cpython-312.pyc
│   │   │           │   │   ├── context.cpython-312.pyc
│   │   │           │   │   ├── core.cpython-312.pyc
│   │   │           │   │   └── cursor.cpython-312.pyc
│   │   │           │   ├── __version__.py
│   │   │           │   ├── context.py
│   │   │           │   ├── core.py
│   │   │           │   ├── cursor.py
│   │   │           │   ├── py.typed
│   │   │           │   └── tests
│   │   │           │       ├── __init__.py
│   │   │           │       ├── __main__.py
│   │   │           │       ├── helpers.py
│   │   │           │       ├── perf.py
│   │   │           │       └── smoke.py
│   │   │           ├── aiosqlite-0.21.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   └── WHEEL
│   │   │           ├── alembic
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __main__.py
│   │   │           │   ├── __pycache__
│   │   │           │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   ├── command.cpython-312.pyc
│   │   │           │   │   ├── config.cpython-312.pyc
│   │   │           │   │   ├── context.cpython-312.pyc
│   │   │           │   │   └── op.cpython-312.pyc
│   │   │           │   ├── autogenerate
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── api.cpython-312.pyc
│   │   │           │   │   │   ├── compare.cpython-312.pyc
│   │   │           │   │   │   ├── render.cpython-312.pyc
│   │   │           │   │   │   └── rewriter.cpython-312.pyc
│   │   │           │   │   ├── api.py
│   │   │           │   │   ├── compare.py
│   │   │           │   │   ├── render.py
│   │   │           │   │   └── rewriter.py
│   │   │           │   ├── command.py
│   │   │           │   ├── config.py
│   │   │           │   ├── context.py
│   │   │           │   ├── context.pyi
│   │   │           │   ├── ddl
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── _autogen.cpython-312.pyc
│   │   │           │   │   │   ├── base.cpython-312.pyc
│   │   │           │   │   │   ├── impl.cpython-312.pyc
│   │   │           │   │   │   ├── mssql.cpython-312.pyc
│   │   │           │   │   │   ├── mysql.cpython-312.pyc
│   │   │           │   │   │   ├── oracle.cpython-312.pyc
│   │   │           │   │   │   ├── postgresql.cpython-312.pyc
│   │   │           │   │   │   └── sqlite.cpython-312.pyc
│   │   │           │   │   ├── _autogen.py
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── impl.py
│   │   │           │   │   ├── mssql.py
│   │   │           │   │   ├── mysql.py
│   │   │           │   │   ├── oracle.py
│   │   │           │   │   ├── postgresql.py
│   │   │           │   │   └── sqlite.py
│   │   │           │   ├── environment.py
│   │   │           │   ├── migration.py
│   │   │           │   ├── op.py
│   │   │           │   ├── op.pyi
│   │   │           │   ├── operations
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── base.cpython-312.pyc
│   │   │           │   │   │   ├── batch.cpython-312.pyc
│   │   │           │   │   │   ├── ops.cpython-312.pyc
│   │   │           │   │   │   ├── schemaobj.cpython-312.pyc
│   │   │           │   │   │   └── toimpl.cpython-312.pyc
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── batch.py
│   │   │           │   │   ├── ops.py
│   │   │           │   │   ├── schemaobj.py
│   │   │           │   │   └── toimpl.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── runtime
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── environment.cpython-312.pyc
│   │   │           │   │   │   └── migration.cpython-312.pyc
│   │   │           │   │   ├── environment.py
│   │   │           │   │   └── migration.py
│   │   │           │   ├── script
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── base.cpython-312.pyc
│   │   │           │   │   │   ├── revision.cpython-312.pyc
│   │   │           │   │   │   └── write_hooks.cpython-312.pyc
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── revision.py
│   │   │           │   │   └── write_hooks.py
│   │   │           │   ├── templates
│   │   │           │   │   ├── async
│   │   │           │   │   │   ├── README
│   │   │           │   │   │   ├── alembic.ini.mako
│   │   │           │   │   │   ├── env.py
│   │   │           │   │   │   └── script.py.mako
│   │   │           │   │   ├── generic
│   │   │           │   │   │   ├── README
│   │   │           │   │   │   ├── alembic.ini.mako
│   │   │           │   │   │   ├── env.py
│   │   │           │   │   │   └── script.py.mako
│   │   │           │   │   └── multidb
│   │   │           │   │       ├── README
│   │   │           │   │       ├── alembic.ini.mako
│   │   │           │   │       ├── env.py
│   │   │           │   │       └── script.py.mako
│   │   │           │   ├── testing
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── assertions.py
│   │   │           │   │   ├── env.py
│   │   │           │   │   ├── fixtures.py
│   │   │           │   │   ├── plugin
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   └── bootstrap.py
│   │   │           │   │   ├── requirements.py
│   │   │           │   │   ├── schemacompare.py
│   │   │           │   │   ├── suite
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   ├── _autogen_fixtures.py
│   │   │           │   │   │   ├── test_autogen_comments.py
│   │   │           │   │   │   ├── test_autogen_computed.py
│   │   │           │   │   │   ├── test_autogen_diffs.py
│   │   │           │   │   │   ├── test_autogen_fks.py
│   │   │           │   │   │   ├── test_autogen_identity.py
│   │   │           │   │   │   ├── test_environment.py
│   │   │           │   │   │   └── test_op.py
│   │   │           │   │   ├── util.py
│   │   │           │   │   └── warnings.py
│   │   │           │   └── util
│   │   │           │       ├── __init__.py
│   │   │           │       ├── __pycache__
│   │   │           │       │   ├── __init__.cpython-312.pyc
│   │   │           │       │   ├── compat.cpython-312.pyc
│   │   │           │       │   ├── editor.cpython-312.pyc
│   │   │           │       │   ├── exc.cpython-312.pyc
│   │   │           │       │   ├── langhelpers.cpython-312.pyc
│   │   │           │       │   ├── messaging.cpython-312.pyc
│   │   │           │       │   ├── pyfiles.cpython-312.pyc
│   │   │           │       │   └── sqla_compat.cpython-312.pyc
│   │   │           │       ├── compat.py
│   │   │           │       ├── editor.py
│   │   │           │       ├── exc.py
│   │   │           │       ├── langhelpers.py
│   │   │           │       ├── messaging.py
│   │   │           │       ├── pyfiles.py
│   │   │           │       └── sqla_compat.py
│   │   │           ├── alembic-1.14.1.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── entry_points.txt
│   │   │           │   └── top_level.txt
│   │   │           ├── annotated_types
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __pycache__
│   │   │           │   │   └── __init__.cpython-312.pyc
│   │   │           │   ├── py.typed
│   │   │           │   └── test_cases.py
│   │   │           ├── annotated_types-0.7.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE
│   │   │           ├── anyio
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _backends
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── _asyncio.py
│   │   │           │   │   └── _trio.py
│   │   │           │   ├── _core
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── _asyncio_selector_thread.py
│   │   │           │   │   ├── _eventloop.py
│   │   │           │   │   ├── _exceptions.py
│   │   │           │   │   ├── _fileio.py
│   │   │           │   │   ├── _resources.py
│   │   │           │   │   ├── _signals.py
│   │   │           │   │   ├── _sockets.py
│   │   │           │   │   ├── _streams.py
│   │   │           │   │   ├── _subprocesses.py
│   │   │           │   │   ├── _synchronization.py
│   │   │           │   │   ├── _tasks.py
│   │   │           │   │   ├── _testing.py
│   │   │           │   │   └── _typedattr.py
│   │   │           │   ├── abc
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── _eventloop.py
│   │   │           │   │   ├── _resources.py
│   │   │           │   │   ├── _sockets.py
│   │   │           │   │   ├── _streams.py
│   │   │           │   │   ├── _subprocesses.py
│   │   │           │   │   ├── _tasks.py
│   │   │           │   │   └── _testing.py
│   │   │           │   ├── from_thread.py
│   │   │           │   ├── lowlevel.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── pytest_plugin.py
│   │   │           │   ├── streams
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── buffered.py
│   │   │           │   │   ├── file.py
│   │   │           │   │   ├── memory.py
│   │   │           │   │   ├── stapled.py
│   │   │           │   │   ├── text.py
│   │   │           │   │   └── tls.py
│   │   │           │   ├── to_interpreter.py
│   │   │           │   ├── to_process.py
│   │   │           │   └── to_thread.py
│   │   │           ├── anyio-4.8.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── entry_points.txt
│   │   │           │   └── top_level.txt
│   │   │           ├── asyncer
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _compat.py
│   │   │           │   ├── _main.py
│   │   │           │   └── py.typed
│   │   │           ├── asyncer-0.0.8.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE
│   │   │           ├── certifi
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __main__.py
│   │   │           │   ├── cacert.pem
│   │   │           │   ├── core.py
│   │   │           │   └── py.typed
│   │   │           ├── certifi-2025.1.31.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── top_level.txt
│   │   │           ├── click
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _compat.py
│   │   │           │   ├── _termui_impl.py
│   │   │           │   ├── _textwrap.py
│   │   │           │   ├── _winconsole.py
│   │   │           │   ├── core.py
│   │   │           │   ├── decorators.py
│   │   │           │   ├── exceptions.py
│   │   │           │   ├── formatting.py
│   │   │           │   ├── globals.py
│   │   │           │   ├── parser.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── shell_completion.py
│   │   │           │   ├── termui.py
│   │   │           │   ├── testing.py
│   │   │           │   ├── types.py
│   │   │           │   └── utils.py
│   │   │           ├── click-8.1.8.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE.txt
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   └── WHEEL
│   │   │           ├── dateutil
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _common.py
│   │   │           │   ├── _version.py
│   │   │           │   ├── easter.py
│   │   │           │   ├── parser
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── _parser.py
│   │   │           │   │   └── isoparser.py
│   │   │           │   ├── relativedelta.py
│   │   │           │   ├── rrule.py
│   │   │           │   ├── tz
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── _common.py
│   │   │           │   │   ├── _factories.py
│   │   │           │   │   ├── tz.py
│   │   │           │   │   └── win.py
│   │   │           │   ├── tzwin.py
│   │   │           │   ├── utils.py
│   │   │           │   └── zoneinfo
│   │   │           │       ├── __init__.py
│   │   │           │       ├── dateutil-zoneinfo.tar.gz
│   │   │           │       └── rebuild.py
│   │   │           ├── dns
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _asyncbackend.py
│   │   │           │   ├── _asyncio_backend.py
│   │   │           │   ├── _ddr.py
│   │   │           │   ├── _features.py
│   │   │           │   ├── _immutable_ctx.py
│   │   │           │   ├── _trio_backend.py
│   │   │           │   ├── asyncbackend.py
│   │   │           │   ├── asyncquery.py
│   │   │           │   ├── asyncresolver.py
│   │   │           │   ├── dnssec.py
│   │   │           │   ├── dnssecalgs
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── cryptography.py
│   │   │           │   │   ├── dsa.py
│   │   │           │   │   ├── ecdsa.py
│   │   │           │   │   ├── eddsa.py
│   │   │           │   │   └── rsa.py
│   │   │           │   ├── dnssectypes.py
│   │   │           │   ├── e164.py
│   │   │           │   ├── edns.py
│   │   │           │   ├── entropy.py
│   │   │           │   ├── enum.py
│   │   │           │   ├── exception.py
│   │   │           │   ├── flags.py
│   │   │           │   ├── grange.py
│   │   │           │   ├── immutable.py
│   │   │           │   ├── inet.py
│   │   │           │   ├── ipv4.py
│   │   │           │   ├── ipv6.py
│   │   │           │   ├── message.py
│   │   │           │   ├── name.py
│   │   │           │   ├── namedict.py
│   │   │           │   ├── nameserver.py
│   │   │           │   ├── node.py
│   │   │           │   ├── opcode.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── query.py
│   │   │           │   ├── quic
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── _asyncio.py
│   │   │           │   │   ├── _common.py
│   │   │           │   │   ├── _sync.py
│   │   │           │   │   └── _trio.py
│   │   │           │   ├── rcode.py
│   │   │           │   ├── rdata.py
│   │   │           │   ├── rdataclass.py
│   │   │           │   ├── rdataset.py
│   │   │           │   ├── rdatatype.py
│   │   │           │   ├── rdtypes
│   │   │           │   │   ├── ANY
│   │   │           │   │   │   ├── AFSDB.py
│   │   │           │   │   │   ├── AMTRELAY.py
│   │   │           │   │   │   ├── AVC.py
│   │   │           │   │   │   ├── CAA.py
│   │   │           │   │   │   ├── CDNSKEY.py
│   │   │           │   │   │   ├── CDS.py
│   │   │           │   │   │   ├── CERT.py
│   │   │           │   │   │   ├── CNAME.py
│   │   │           │   │   │   ├── CSYNC.py
│   │   │           │   │   │   ├── DLV.py
│   │   │           │   │   │   ├── DNAME.py
│   │   │           │   │   │   ├── DNSKEY.py
│   │   │           │   │   │   ├── DS.py
│   │   │           │   │   │   ├── EUI48.py
│   │   │           │   │   │   ├── EUI64.py
│   │   │           │   │   │   ├── GPOS.py
│   │   │           │   │   │   ├── HINFO.py
│   │   │           │   │   │   ├── HIP.py
│   │   │           │   │   │   ├── ISDN.py
│   │   │           │   │   │   ├── L32.py
│   │   │           │   │   │   ├── L64.py
│   │   │           │   │   │   ├── LOC.py
│   │   │           │   │   │   ├── LP.py
│   │   │           │   │   │   ├── MX.py
│   │   │           │   │   │   ├── NID.py
│   │   │           │   │   │   ├── NINFO.py
│   │   │           │   │   │   ├── NS.py
│   │   │           │   │   │   ├── NSEC.py
│   │   │           │   │   │   ├── NSEC3.py
│   │   │           │   │   │   ├── NSEC3PARAM.py
│   │   │           │   │   │   ├── OPENPGPKEY.py
│   │   │           │   │   │   ├── OPT.py
│   │   │           │   │   │   ├── PTR.py
│   │   │           │   │   │   ├── RESINFO.py
│   │   │           │   │   │   ├── RP.py
│   │   │           │   │   │   ├── RRSIG.py
│   │   │           │   │   │   ├── RT.py
│   │   │           │   │   │   ├── SMIMEA.py
│   │   │           │   │   │   ├── SOA.py
│   │   │           │   │   │   ├── SPF.py
│   │   │           │   │   │   ├── SSHFP.py
│   │   │           │   │   │   ├── TKEY.py
│   │   │           │   │   │   ├── TLSA.py
│   │   │           │   │   │   ├── TSIG.py
│   │   │           │   │   │   ├── TXT.py
│   │   │           │   │   │   ├── URI.py
│   │   │           │   │   │   ├── WALLET.py
│   │   │           │   │   │   ├── X25.py
│   │   │           │   │   │   ├── ZONEMD.py
│   │   │           │   │   │   └── __init__.py
│   │   │           │   │   ├── CH
│   │   │           │   │   │   ├── A.py
│   │   │           │   │   │   └── __init__.py
│   │   │           │   │   ├── IN
│   │   │           │   │   │   ├── A.py
│   │   │           │   │   │   ├── AAAA.py
│   │   │           │   │   │   ├── APL.py
│   │   │           │   │   │   ├── DHCID.py
│   │   │           │   │   │   ├── HTTPS.py
│   │   │           │   │   │   ├── IPSECKEY.py
│   │   │           │   │   │   ├── KX.py
│   │   │           │   │   │   ├── NAPTR.py
│   │   │           │   │   │   ├── NSAP.py
│   │   │           │   │   │   ├── NSAP_PTR.py
│   │   │           │   │   │   ├── PX.py
│   │   │           │   │   │   ├── SRV.py
│   │   │           │   │   │   ├── SVCB.py
│   │   │           │   │   │   ├── WKS.py
│   │   │           │   │   │   └── __init__.py
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── dnskeybase.py
│   │   │           │   │   ├── dsbase.py
│   │   │           │   │   ├── euibase.py
│   │   │           │   │   ├── mxbase.py
│   │   │           │   │   ├── nsbase.py
│   │   │           │   │   ├── svcbbase.py
│   │   │           │   │   ├── tlsabase.py
│   │   │           │   │   ├── txtbase.py
│   │   │           │   │   └── util.py
│   │   │           │   ├── renderer.py
│   │   │           │   ├── resolver.py
│   │   │           │   ├── reversename.py
│   │   │           │   ├── rrset.py
│   │   │           │   ├── serial.py
│   │   │           │   ├── set.py
│   │   │           │   ├── tokenizer.py
│   │   │           │   ├── transaction.py
│   │   │           │   ├── tsig.py
│   │   │           │   ├── tsigkeyring.py
│   │   │           │   ├── ttl.py
│   │   │           │   ├── update.py
│   │   │           │   ├── version.py
│   │   │           │   ├── versioned.py
│   │   │           │   ├── win32util.py
│   │   │           │   ├── wire.py
│   │   │           │   ├── xfr.py
│   │   │           │   ├── zone.py
│   │   │           │   ├── zonefile.py
│   │   │           │   └── zonetypes.py
│   │   │           ├── dnspython-2.7.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE
│   │   │           ├── dotenv
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __main__.py
│   │   │           │   ├── __pycache__
│   │   │           │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   ├── main.cpython-312.pyc
│   │   │           │   │   ├── parser.cpython-312.pyc
│   │   │           │   │   └── variables.cpython-312.pyc
│   │   │           │   ├── cli.py
│   │   │           │   ├── ipython.py
│   │   │           │   ├── main.py
│   │   │           │   ├── parser.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── variables.py
│   │   │           │   └── version.py
│   │   │           ├── email_validator
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __main__.py
│   │   │           │   ├── deliverability.py
│   │   │           │   ├── exceptions_types.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── rfc_constants.py
│   │   │           │   ├── syntax.py
│   │   │           │   ├── validate_email.py
│   │   │           │   └── version.py
│   │   │           ├── email_validator-2.2.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── entry_points.txt
│   │   │           │   └── top_level.txt
│   │   │           ├── fastapi
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __main__.py
│   │   │           │   ├── _compat.py
│   │   │           │   ├── applications.py
│   │   │           │   ├── background.py
│   │   │           │   ├── cli.py
│   │   │           │   ├── concurrency.py
│   │   │           │   ├── datastructures.py
│   │   │           │   ├── dependencies
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── models.py
│   │   │           │   │   └── utils.py
│   │   │           │   ├── encoders.py
│   │   │           │   ├── exception_handlers.py
│   │   │           │   ├── exceptions.py
│   │   │           │   ├── logger.py
│   │   │           │   ├── middleware
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── cors.py
│   │   │           │   │   ├── gzip.py
│   │   │           │   │   ├── httpsredirect.py
│   │   │           │   │   ├── trustedhost.py
│   │   │           │   │   └── wsgi.py
│   │   │           │   ├── openapi
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── constants.py
│   │   │           │   │   ├── docs.py
│   │   │           │   │   ├── models.py
│   │   │           │   │   └── utils.py
│   │   │           │   ├── param_functions.py
│   │   │           │   ├── params.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── requests.py
│   │   │           │   ├── responses.py
│   │   │           │   ├── routing.py
│   │   │           │   ├── security
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── api_key.py
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── http.py
│   │   │           │   │   ├── oauth2.py
│   │   │           │   │   ├── open_id_connect_url.py
│   │   │           │   │   └── utils.py
│   │   │           │   ├── staticfiles.py
│   │   │           │   ├── templating.py
│   │   │           │   ├── testclient.py
│   │   │           │   ├── types.py
│   │   │           │   ├── utils.py
│   │   │           │   └── websockets.py
│   │   │           ├── fastapi-0.115.8.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── entry_points.txt
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE
│   │   │           ├── fastapi_cli
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __main__.py
│   │   │           │   ├── cli.py
│   │   │           │   ├── discover.py
│   │   │           │   ├── exceptions.py
│   │   │           │   ├── logging.py
│   │   │           │   ├── py.typed
│   │   │           │   └── utils
│   │   │           │       ├── __init__.py
│   │   │           │       └── cli.py
│   │   │           ├── fastapi_cli-0.0.7.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── entry_points.txt
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE
│   │   │           ├── greenlet
│   │   │           │   ├── CObjects.cpp
│   │   │           │   ├── PyGreenlet.cpp
│   │   │           │   ├── PyGreenlet.hpp
│   │   │           │   ├── PyGreenletUnswitchable.cpp
│   │   │           │   ├── PyModule.cpp
│   │   │           │   ├── TBrokenGreenlet.cpp
│   │   │           │   ├── TExceptionState.cpp
│   │   │           │   ├── TGreenlet.cpp
│   │   │           │   ├── TGreenlet.hpp
│   │   │           │   ├── TGreenletGlobals.cpp
│   │   │           │   ├── TMainGreenlet.cpp
│   │   │           │   ├── TPythonState.cpp
│   │   │           │   ├── TStackState.cpp
│   │   │           │   ├── TThreadState.hpp
│   │   │           │   ├── TThreadStateCreator.hpp
│   │   │           │   ├── TThreadStateDestroy.cpp
│   │   │           │   ├── TUserGreenlet.cpp
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __pycache__
│   │   │           │   │   └── __init__.cpython-312.pyc
│   │   │           │   ├── _greenlet.cpython-312-x86_64-linux-gnu.so
│   │   │           │   ├── greenlet.cpp
│   │   │           │   ├── greenlet.h
│   │   │           │   ├── greenlet_allocator.hpp
│   │   │           │   ├── greenlet_compiler_compat.hpp
│   │   │           │   ├── greenlet_cpython_add_pending.hpp
│   │   │           │   ├── greenlet_cpython_compat.hpp
│   │   │           │   ├── greenlet_exceptions.hpp
│   │   │           │   ├── greenlet_internal.hpp
│   │   │           │   ├── greenlet_refs.hpp
│   │   │           │   ├── greenlet_slp_switch.hpp
│   │   │           │   ├── greenlet_thread_support.hpp
│   │   │           │   ├── platform
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── setup_switch_x64_masm.cmd
│   │   │           │   │   ├── switch_aarch64_gcc.h
│   │   │           │   │   ├── switch_alpha_unix.h
│   │   │           │   │   ├── switch_amd64_unix.h
│   │   │           │   │   ├── switch_arm32_gcc.h
│   │   │           │   │   ├── switch_arm32_ios.h
│   │   │           │   │   ├── switch_arm64_masm.asm
│   │   │           │   │   ├── switch_arm64_masm.obj
│   │   │           │   │   ├── switch_arm64_msvc.h
│   │   │           │   │   ├── switch_csky_gcc.h
│   │   │           │   │   ├── switch_loongarch64_linux.h
│   │   │           │   │   ├── switch_m68k_gcc.h
│   │   │           │   │   ├── switch_mips_unix.h
│   │   │           │   │   ├── switch_ppc64_aix.h
│   │   │           │   │   ├── switch_ppc64_linux.h
│   │   │           │   │   ├── switch_ppc_aix.h
│   │   │           │   │   ├── switch_ppc_linux.h
│   │   │           │   │   ├── switch_ppc_macosx.h
│   │   │           │   │   ├── switch_ppc_unix.h
│   │   │           │   │   ├── switch_riscv_unix.h
│   │   │           │   │   ├── switch_s390_unix.h
│   │   │           │   │   ├── switch_sh_gcc.h
│   │   │           │   │   ├── switch_sparc_sun_gcc.h
│   │   │           │   │   ├── switch_x32_unix.h
│   │   │           │   │   ├── switch_x64_masm.asm
│   │   │           │   │   ├── switch_x64_masm.obj
│   │   │           │   │   ├── switch_x64_msvc.h
│   │   │           │   │   ├── switch_x86_msvc.h
│   │   │           │   │   └── switch_x86_unix.h
│   │   │           │   ├── slp_platformselect.h
│   │   │           │   └── tests
│   │   │           │       ├── __init__.py
│   │   │           │       ├── _test_extension.c
│   │   │           │       ├── _test_extension.cpython-312-x86_64-linux-gnu.so
│   │   │           │       ├── _test_extension_cpp.cpp
│   │   │           │       ├── _test_extension_cpp.cpython-312-x86_64-linux-gnu.so
│   │   │           │       ├── fail_clearing_run_switches.py
│   │   │           │       ├── fail_cpp_exception.py
│   │   │           │       ├── fail_initialstub_already_started.py
│   │   │           │       ├── fail_slp_switch.py
│   │   │           │       ├── fail_switch_three_greenlets.py
│   │   │           │       ├── fail_switch_three_greenlets2.py
│   │   │           │       ├── fail_switch_two_greenlets.py
│   │   │           │       ├── leakcheck.py
│   │   │           │       ├── test_contextvars.py
│   │   │           │       ├── test_cpp.py
│   │   │           │       ├── test_extension_interface.py
│   │   │           │       ├── test_gc.py
│   │   │           │       ├── test_generator.py
│   │   │           │       ├── test_generator_nested.py
│   │   │           │       ├── test_greenlet.py
│   │   │           │       ├── test_greenlet_trash.py
│   │   │           │       ├── test_leaks.py
│   │   │           │       ├── test_stack_saved.py
│   │   │           │       ├── test_throw.py
│   │   │           │       ├── test_tracing.py
│   │   │           │       ├── test_version.py
│   │   │           │       └── test_weakref.py
│   │   │           ├── greenlet-3.1.1.dist-info
│   │   │           │   ├── AUTHORS
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── LICENSE.PSF
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── top_level.txt
│   │   │           ├── h11
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _abnf.py
│   │   │           │   ├── _connection.py
│   │   │           │   ├── _events.py
│   │   │           │   ├── _headers.py
│   │   │           │   ├── _readers.py
│   │   │           │   ├── _receivebuffer.py
│   │   │           │   ├── _state.py
│   │   │           │   ├── _util.py
│   │   │           │   ├── _version.py
│   │   │           │   ├── _writers.py
│   │   │           │   ├── py.typed
│   │   │           │   └── tests
│   │   │           │       ├── __init__.py
│   │   │           │       ├── data
│   │   │           │       │   └── test-file
│   │   │           │       ├── helpers.py
│   │   │           │       ├── test_against_stdlib_http.py
│   │   │           │       ├── test_connection.py
│   │   │           │       ├── test_events.py
│   │   │           │       ├── test_headers.py
│   │   │           │       ├── test_helpers.py
│   │   │           │       ├── test_io.py
│   │   │           │       ├── test_receivebuffer.py
│   │   │           │       ├── test_state.py
│   │   │           │       └── test_util.py
│   │   │           ├── h11-0.14.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE.txt
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── top_level.txt
│   │   │           ├── httpcore
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _api.py
│   │   │           │   ├── _async
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── connection.py
│   │   │           │   │   ├── connection_pool.py
│   │   │           │   │   ├── http11.py
│   │   │           │   │   ├── http2.py
│   │   │           │   │   ├── http_proxy.py
│   │   │           │   │   ├── interfaces.py
│   │   │           │   │   └── socks_proxy.py
│   │   │           │   ├── _backends
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── anyio.py
│   │   │           │   │   ├── auto.py
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── mock.py
│   │   │           │   │   ├── sync.py
│   │   │           │   │   └── trio.py
│   │   │           │   ├── _exceptions.py
│   │   │           │   ├── _models.py
│   │   │           │   ├── _ssl.py
│   │   │           │   ├── _sync
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── connection.py
│   │   │           │   │   ├── connection_pool.py
│   │   │           │   │   ├── http11.py
│   │   │           │   │   ├── http2.py
│   │   │           │   │   ├── http_proxy.py
│   │   │           │   │   ├── interfaces.py
│   │   │           │   │   └── socks_proxy.py
│   │   │           │   ├── _synchronization.py
│   │   │           │   ├── _trace.py
│   │   │           │   ├── _utils.py
│   │   │           │   └── py.typed
│   │   │           ├── httpcore-1.0.7.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE.md
│   │   │           ├── httptools
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _version.py
│   │   │           │   └── parser
│   │   │           │       ├── __init__.py
│   │   │           │       ├── cparser.pxd
│   │   │           │       ├── errors.py
│   │   │           │       ├── parser.cpython-312-x86_64-linux-gnu.so
│   │   │           │       ├── parser.pyx
│   │   │           │       ├── python.pxd
│   │   │           │       ├── url_cparser.pxd
│   │   │           │       ├── url_parser.cpython-312-x86_64-linux-gnu.so
│   │   │           │       └── url_parser.pyx
│   │   │           ├── httptools-0.6.4.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── top_level.txt
│   │   │           ├── httpx
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __version__.py
│   │   │           │   ├── _api.py
│   │   │           │   ├── _auth.py
│   │   │           │   ├── _client.py
│   │   │           │   ├── _config.py
│   │   │           │   ├── _content.py
│   │   │           │   ├── _decoders.py
│   │   │           │   ├── _exceptions.py
│   │   │           │   ├── _main.py
│   │   │           │   ├── _models.py
│   │   │           │   ├── _multipart.py
│   │   │           │   ├── _status_codes.py
│   │   │           │   ├── _transports
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── asgi.py
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── default.py
│   │   │           │   │   ├── mock.py
│   │   │           │   │   └── wsgi.py
│   │   │           │   ├── _types.py
│   │   │           │   ├── _urlparse.py
│   │   │           │   ├── _urls.py
│   │   │           │   ├── _utils.py
│   │   │           │   └── py.typed
│   │   │           ├── httpx-0.28.1.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── entry_points.txt
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE.md
│   │   │           ├── idna
│   │   │           │   ├── __init__.py
│   │   │           │   ├── codec.py
│   │   │           │   ├── compat.py
│   │   │           │   ├── core.py
│   │   │           │   ├── idnadata.py
│   │   │           │   ├── intranges.py
│   │   │           │   ├── package_data.py
│   │   │           │   ├── py.typed
│   │   │           │   └── uts46data.py
│   │   │           ├── idna-3.10.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE.md
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   └── WHEEL
│   │   │           ├── itsdangerous
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _json.py
│   │   │           │   ├── encoding.py
│   │   │           │   ├── exc.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── serializer.py
│   │   │           │   ├── signer.py
│   │   │           │   ├── timed.py
│   │   │           │   └── url_safe.py
│   │   │           ├── itsdangerous-2.2.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE.txt
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   └── WHEEL
│   │   │           ├── japanese_learning_portal-0.1.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── direct_url.json
│   │   │           │   └── uv_cache.json
│   │   │           ├── jinja2
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _identifier.py
│   │   │           │   ├── async_utils.py
│   │   │           │   ├── bccache.py
│   │   │           │   ├── compiler.py
│   │   │           │   ├── constants.py
│   │   │           │   ├── debug.py
│   │   │           │   ├── defaults.py
│   │   │           │   ├── environment.py
│   │   │           │   ├── exceptions.py
│   │   │           │   ├── ext.py
│   │   │           │   ├── filters.py
│   │   │           │   ├── idtracking.py
│   │   │           │   ├── lexer.py
│   │   │           │   ├── loaders.py
│   │   │           │   ├── meta.py
│   │   │           │   ├── nativetypes.py
│   │   │           │   ├── nodes.py
│   │   │           │   ├── optimizer.py
│   │   │           │   ├── parser.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── runtime.py
│   │   │           │   ├── sandbox.py
│   │   │           │   ├── tests.py
│   │   │           │   ├── utils.py
│   │   │           │   └── visitor.py
│   │   │           ├── jinja2-3.1.5.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE.txt
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── entry_points.txt
│   │   │           ├── mako
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __pycache__
│   │   │           │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   ├── _ast_util.cpython-312.pyc
│   │   │           │   │   ├── ast.cpython-312.pyc
│   │   │           │   │   ├── cache.cpython-312.pyc
│   │   │           │   │   ├── codegen.cpython-312.pyc
│   │   │           │   │   ├── compat.cpython-312.pyc
│   │   │           │   │   ├── exceptions.cpython-312.pyc
│   │   │           │   │   ├── filters.cpython-312.pyc
│   │   │           │   │   ├── lexer.cpython-312.pyc
│   │   │           │   │   ├── parsetree.cpython-312.pyc
│   │   │           │   │   ├── pygen.cpython-312.pyc
│   │   │           │   │   ├── pyparser.cpython-312.pyc
│   │   │           │   │   ├── runtime.cpython-312.pyc
│   │   │           │   │   ├── template.cpython-312.pyc
│   │   │           │   │   └── util.cpython-312.pyc
│   │   │           │   ├── _ast_util.py
│   │   │           │   ├── ast.py
│   │   │           │   ├── cache.py
│   │   │           │   ├── cmd.py
│   │   │           │   ├── codegen.py
│   │   │           │   ├── compat.py
│   │   │           │   ├── exceptions.py
│   │   │           │   ├── ext
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   └── pygmentplugin.cpython-312.pyc
│   │   │           │   │   ├── autohandler.py
│   │   │           │   │   ├── babelplugin.py
│   │   │           │   │   ├── beaker_cache.py
│   │   │           │   │   ├── extract.py
│   │   │           │   │   ├── linguaplugin.py
│   │   │           │   │   ├── preprocessors.py
│   │   │           │   │   ├── pygmentplugin.py
│   │   │           │   │   └── turbogears.py
│   │   │           │   ├── filters.py
│   │   │           │   ├── lexer.py
│   │   │           │   ├── lookup.py
│   │   │           │   ├── parsetree.py
│   │   │           │   ├── pygen.py
│   │   │           │   ├── pyparser.py
│   │   │           │   ├── runtime.py
│   │   │           │   ├── template.py
│   │   │           │   ├── testing
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── _config.py
│   │   │           │   │   ├── assertions.py
│   │   │           │   │   ├── config.py
│   │   │           │   │   ├── exclusions.py
│   │   │           │   │   ├── fixtures.py
│   │   │           │   │   └── helpers.py
│   │   │           │   └── util.py
│   │   │           ├── markdown_it
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _compat.py
│   │   │           │   ├── _punycode.py
│   │   │           │   ├── cli
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   └── parse.py
│   │   │           │   ├── common
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── entities.py
│   │   │           │   │   ├── html_blocks.py
│   │   │           │   │   ├── html_re.py
│   │   │           │   │   ├── normalize_url.py
│   │   │           │   │   └── utils.py
│   │   │           │   ├── helpers
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── parse_link_destination.py
│   │   │           │   │   ├── parse_link_label.py
│   │   │           │   │   └── parse_link_title.py
│   │   │           │   ├── main.py
│   │   │           │   ├── parser_block.py
│   │   │           │   ├── parser_core.py
│   │   │           │   ├── parser_inline.py
│   │   │           │   ├── port.yaml
│   │   │           │   ├── presets
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── commonmark.py
│   │   │           │   │   ├── default.py
│   │   │           │   │   └── zero.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── renderer.py
│   │   │           │   ├── ruler.py
│   │   │           │   ├── rules_block
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── blockquote.py
│   │   │           │   │   ├── code.py
│   │   │           │   │   ├── fence.py
│   │   │           │   │   ├── heading.py
│   │   │           │   │   ├── hr.py
│   │   │           │   │   ├── html_block.py
│   │   │           │   │   ├── lheading.py
│   │   │           │   │   ├── list.py
│   │   │           │   │   ├── paragraph.py
│   │   │           │   │   ├── reference.py
│   │   │           │   │   ├── state_block.py
│   │   │           │   │   └── table.py
│   │   │           │   ├── rules_core
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── block.py
│   │   │           │   │   ├── inline.py
│   │   │           │   │   ├── linkify.py
│   │   │           │   │   ├── normalize.py
│   │   │           │   │   ├── replacements.py
│   │   │           │   │   ├── smartquotes.py
│   │   │           │   │   ├── state_core.py
│   │   │           │   │   └── text_join.py
│   │   │           │   ├── rules_inline
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── autolink.py
│   │   │           │   │   ├── backticks.py
│   │   │           │   │   ├── balance_pairs.py
│   │   │           │   │   ├── emphasis.py
│   │   │           │   │   ├── entity.py
│   │   │           │   │   ├── escape.py
│   │   │           │   │   ├── fragments_join.py
│   │   │           │   │   ├── html_inline.py
│   │   │           │   │   ├── image.py
│   │   │           │   │   ├── link.py
│   │   │           │   │   ├── linkify.py
│   │   │           │   │   ├── newline.py
│   │   │           │   │   ├── state_inline.py
│   │   │           │   │   ├── strikethrough.py
│   │   │           │   │   └── text.py
│   │   │           │   ├── token.py
│   │   │           │   ├── tree.py
│   │   │           │   └── utils.py
│   │   │           ├── markdown_it_py-3.0.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── LICENSE.markdown-it
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── entry_points.txt
│   │   │           ├── markupsafe
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __pycache__
│   │   │           │   │   └── __init__.cpython-312.pyc
│   │   │           │   ├── _native.py
│   │   │           │   ├── _speedups.c
│   │   │           │   ├── _speedups.cpython-312-x86_64-linux-gnu.so
│   │   │           │   ├── _speedups.pyi
│   │   │           │   └── py.typed
│   │   │           ├── mdurl
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _decode.py
│   │   │           │   ├── _encode.py
│   │   │           │   ├── _format.py
│   │   │           │   ├── _parse.py
│   │   │           │   ├── _url.py
│   │   │           │   └── py.typed
│   │   │           ├── mdurl-0.1.2.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   └── WHEEL
│   │   │           ├── multipart
│   │   │           │   ├── __init__.py
│   │   │           │   ├── decoders.py
│   │   │           │   ├── exceptions.py
│   │   │           │   └── multipart.py
│   │   │           ├── orjson
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __init__.pyi
│   │   │           │   ├── orjson.cpython-312-x86_64-linux-gnu.so
│   │   │           │   └── py.typed
│   │   │           ├── orjson-3.10.15.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── licenses
│   │   │           │       ├── LICENSE-APACHE
│   │   │           │       └── LICENSE-MIT
│   │   │           ├── pydantic
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __pycache__
│   │   │           │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   ├── _migration.cpython-312.pyc
│   │   │           │   │   ├── aliases.cpython-312.pyc
│   │   │           │   │   ├── annotated_handlers.cpython-312.pyc
│   │   │           │   │   ├── config.cpython-312.pyc
│   │   │           │   │   ├── dataclasses.cpython-312.pyc
│   │   │           │   │   ├── errors.cpython-312.pyc
│   │   │           │   │   ├── fields.cpython-312.pyc
│   │   │           │   │   ├── functional_validators.cpython-312.pyc
│   │   │           │   │   ├── json_schema.cpython-312.pyc
│   │   │           │   │   ├── main.cpython-312.pyc
│   │   │           │   │   ├── root_model.cpython-312.pyc
│   │   │           │   │   ├── type_adapter.cpython-312.pyc
│   │   │           │   │   ├── types.cpython-312.pyc
│   │   │           │   │   ├── version.cpython-312.pyc
│   │   │           │   │   └── warnings.cpython-312.pyc
│   │   │           │   ├── _internal
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── _config.cpython-312.pyc
│   │   │           │   │   │   ├── _core_metadata.cpython-312.pyc
│   │   │           │   │   │   ├── _core_utils.cpython-312.pyc
│   │   │           │   │   │   ├── _dataclasses.cpython-312.pyc
│   │   │           │   │   │   ├── _decorators.cpython-312.pyc
│   │   │           │   │   │   ├── _decorators_v1.cpython-312.pyc
│   │   │           │   │   │   ├── _discriminated_union.cpython-312.pyc
│   │   │           │   │   │   ├── _docs_extraction.cpython-312.pyc
│   │   │           │   │   │   ├── _fields.cpython-312.pyc
│   │   │           │   │   │   ├── _forward_ref.cpython-312.pyc
│   │   │           │   │   │   ├── _generate_schema.cpython-312.pyc
│   │   │           │   │   │   ├── _generics.cpython-312.pyc
│   │   │           │   │   │   ├── _import_utils.cpython-312.pyc
│   │   │           │   │   │   ├── _internal_dataclass.cpython-312.pyc
│   │   │           │   │   │   ├── _known_annotated_metadata.cpython-312.pyc
│   │   │           │   │   │   ├── _mock_val_ser.cpython-312.pyc
│   │   │           │   │   │   ├── _model_construction.cpython-312.pyc
│   │   │           │   │   │   ├── _namespace_utils.cpython-312.pyc
│   │   │           │   │   │   ├── _repr.cpython-312.pyc
│   │   │           │   │   │   ├── _schema_generation_shared.cpython-312.pyc
│   │   │           │   │   │   ├── _serializers.cpython-312.pyc
│   │   │           │   │   │   ├── _signature.cpython-312.pyc
│   │   │           │   │   │   ├── _std_types_schema.cpython-312.pyc
│   │   │           │   │   │   ├── _typing_extra.cpython-312.pyc
│   │   │           │   │   │   ├── _utils.cpython-312.pyc
│   │   │           │   │   │   └── _validators.cpython-312.pyc
│   │   │           │   │   ├── _config.py
│   │   │           │   │   ├── _core_metadata.py
│   │   │           │   │   ├── _core_utils.py
│   │   │           │   │   ├── _dataclasses.py
│   │   │           │   │   ├── _decorators.py
│   │   │           │   │   ├── _decorators_v1.py
│   │   │           │   │   ├── _discriminated_union.py
│   │   │           │   │   ├── _docs_extraction.py
│   │   │           │   │   ├── _fields.py
│   │   │           │   │   ├── _forward_ref.py
│   │   │           │   │   ├── _generate_schema.py
│   │   │           │   │   ├── _generics.py
│   │   │           │   │   ├── _git.py
│   │   │           │   │   ├── _import_utils.py
│   │   │           │   │   ├── _internal_dataclass.py
│   │   │           │   │   ├── _known_annotated_metadata.py
│   │   │           │   │   ├── _mock_val_ser.py
│   │   │           │   │   ├── _model_construction.py
│   │   │           │   │   ├── _namespace_utils.py
│   │   │           │   │   ├── _repr.py
│   │   │           │   │   ├── _schema_generation_shared.py
│   │   │           │   │   ├── _serializers.py
│   │   │           │   │   ├── _signature.py
│   │   │           │   │   ├── _std_types_schema.py
│   │   │           │   │   ├── _typing_extra.py
│   │   │           │   │   ├── _utils.py
│   │   │           │   │   ├── _validate_call.py
│   │   │           │   │   └── _validators.py
│   │   │           │   ├── _migration.py
│   │   │           │   ├── alias_generators.py
│   │   │           │   ├── aliases.py
│   │   │           │   ├── annotated_handlers.py
│   │   │           │   ├── class_validators.py
│   │   │           │   ├── color.py
│   │   │           │   ├── config.py
│   │   │           │   ├── dataclasses.py
│   │   │           │   ├── datetime_parse.py
│   │   │           │   ├── decorator.py
│   │   │           │   ├── deprecated
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   └── class_validators.cpython-312.pyc
│   │   │           │   │   ├── class_validators.py
│   │   │           │   │   ├── config.py
│   │   │           │   │   ├── copy_internals.py
│   │   │           │   │   ├── decorator.py
│   │   │           │   │   ├── json.py
│   │   │           │   │   ├── parse.py
│   │   │           │   │   └── tools.py
│   │   │           │   ├── env_settings.py
│   │   │           │   ├── error_wrappers.py
│   │   │           │   ├── errors.py
│   │   │           │   ├── experimental
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   └── pipeline.py
│   │   │           │   ├── fields.py
│   │   │           │   ├── functional_serializers.py
│   │   │           │   ├── functional_validators.py
│   │   │           │   ├── generics.py
│   │   │           │   ├── json.py
│   │   │           │   ├── json_schema.py
│   │   │           │   ├── main.py
│   │   │           │   ├── mypy.py
│   │   │           │   ├── networks.py
│   │   │           │   ├── parse.py
│   │   │           │   ├── plugin
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── _loader.cpython-312.pyc
│   │   │           │   │   │   └── _schema_validator.cpython-312.pyc
│   │   │           │   │   ├── _loader.py
│   │   │           │   │   └── _schema_validator.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── root_model.py
│   │   │           │   ├── schema.py
│   │   │           │   ├── tools.py
│   │   │           │   ├── type_adapter.py
│   │   │           │   ├── types.py
│   │   │           │   ├── typing.py
│   │   │           │   ├── utils.py
│   │   │           │   ├── v1
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── _hypothesis_plugin.py
│   │   │           │   │   ├── annotated_types.py
│   │   │           │   │   ├── class_validators.py
│   │   │           │   │   ├── color.py
│   │   │           │   │   ├── config.py
│   │   │           │   │   ├── dataclasses.py
│   │   │           │   │   ├── datetime_parse.py
│   │   │           │   │   ├── decorator.py
│   │   │           │   │   ├── env_settings.py
│   │   │           │   │   ├── error_wrappers.py
│   │   │           │   │   ├── errors.py
│   │   │           │   │   ├── fields.py
│   │   │           │   │   ├── generics.py
│   │   │           │   │   ├── json.py
│   │   │           │   │   ├── main.py
│   │   │           │   │   ├── mypy.py
│   │   │           │   │   ├── networks.py
│   │   │           │   │   ├── parse.py
│   │   │           │   │   ├── py.typed
│   │   │           │   │   ├── schema.py
│   │   │           │   │   ├── tools.py
│   │   │           │   │   ├── types.py
│   │   │           │   │   ├── typing.py
│   │   │           │   │   ├── utils.py
│   │   │           │   │   ├── validators.py
│   │   │           │   │   └── version.py
│   │   │           │   ├── validate_call_decorator.py
│   │   │           │   ├── validators.py
│   │   │           │   ├── version.py
│   │   │           │   └── warnings.py
│   │   │           ├── pydantic-2.10.6.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE
│   │   │           ├── pydantic_core
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __pycache__
│   │   │           │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   └── core_schema.cpython-312.pyc
│   │   │           │   ├── _pydantic_core.cpython-312-x86_64-linux-gnu.so
│   │   │           │   ├── _pydantic_core.pyi
│   │   │           │   ├── core_schema.py
│   │   │           │   └── py.typed
│   │   │           ├── pydantic_core-2.27.2.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE
│   │   │           ├── pydantic_extra_types
│   │   │           │   ├── __init__.py
│   │   │           │   ├── color.py
│   │   │           │   ├── coordinate.py
│   │   │           │   ├── country.py
│   │   │           │   ├── currency_code.py
│   │   │           │   ├── domain.py
│   │   │           │   ├── epoch.py
│   │   │           │   ├── isbn.py
│   │   │           │   ├── language_code.py
│   │   │           │   ├── mac_address.py
│   │   │           │   ├── payment.py
│   │   │           │   ├── pendulum_dt.py
│   │   │           │   ├── phone_numbers.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── routing_number.py
│   │   │           │   ├── s3.py
│   │   │           │   ├── script_code.py
│   │   │           │   ├── semantic_version.py
│   │   │           │   ├── semver.py
│   │   │           │   ├── timezone_name.py
│   │   │           │   └── ulid.py
│   │   │           ├── pydantic_extra_types-2.10.2.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE
│   │   │           ├── pydantic_settings
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __pycache__
│   │   │           │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   ├── main.cpython-312.pyc
│   │   │           │   │   ├── sources.cpython-312.pyc
│   │   │           │   │   ├── utils.cpython-312.pyc
│   │   │           │   │   └── version.cpython-312.pyc
│   │   │           │   ├── main.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── sources.py
│   │   │           │   ├── utils.py
│   │   │           │   └── version.py
│   │   │           ├── pydantic_settings-2.7.1.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE
│   │   │           ├── pygments
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __main__.py
│   │   │           │   ├── __pycache__
│   │   │           │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   ├── filter.cpython-312.pyc
│   │   │           │   │   ├── formatter.cpython-312.pyc
│   │   │           │   │   ├── lexer.cpython-312.pyc
│   │   │           │   │   ├── modeline.cpython-312.pyc
│   │   │           │   │   ├── plugin.cpython-312.pyc
│   │   │           │   │   ├── regexopt.cpython-312.pyc
│   │   │           │   │   ├── style.cpython-312.pyc
│   │   │           │   │   ├── token.cpython-312.pyc
│   │   │           │   │   ├── unistring.cpython-312.pyc
│   │   │           │   │   └── util.cpython-312.pyc
│   │   │           │   ├── cmdline.py
│   │   │           │   ├── console.py
│   │   │           │   ├── filter.py
│   │   │           │   ├── filters
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   └── __pycache__
│   │   │           │   │       └── __init__.cpython-312.pyc
│   │   │           │   ├── formatter.py
│   │   │           │   ├── formatters
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── _mapping.cpython-312.pyc
│   │   │           │   │   │   └── html.cpython-312.pyc
│   │   │           │   │   ├── _mapping.py
│   │   │           │   │   ├── bbcode.py
│   │   │           │   │   ├── groff.py
│   │   │           │   │   ├── html.py
│   │   │           │   │   ├── img.py
│   │   │           │   │   ├── irc.py
│   │   │           │   │   ├── latex.py
│   │   │           │   │   ├── other.py
│   │   │           │   │   ├── pangomarkup.py
│   │   │           │   │   ├── rtf.py
│   │   │           │   │   ├── svg.py
│   │   │           │   │   ├── terminal.py
│   │   │           │   │   └── terminal256.py
│   │   │           │   ├── lexer.py
│   │   │           │   ├── lexers
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── _css_builtins.cpython-312.pyc
│   │   │           │   │   │   ├── _lua_builtins.cpython-312.pyc
│   │   │           │   │   │   ├── _mapping.cpython-312.pyc
│   │   │           │   │   │   ├── _scheme_builtins.cpython-312.pyc
│   │   │           │   │   │   ├── actionscript.cpython-312.pyc
│   │   │           │   │   │   ├── agile.cpython-312.pyc
│   │   │           │   │   │   ├── css.cpython-312.pyc
│   │   │           │   │   │   ├── d.cpython-312.pyc
│   │   │           │   │   │   ├── data.cpython-312.pyc
│   │   │           │   │   │   ├── factor.cpython-312.pyc
│   │   │           │   │   │   ├── html.cpython-312.pyc
│   │   │           │   │   │   ├── iolang.cpython-312.pyc
│   │   │           │   │   │   ├── javascript.cpython-312.pyc
│   │   │           │   │   │   ├── jvm.cpython-312.pyc
│   │   │           │   │   │   ├── lisp.cpython-312.pyc
│   │   │           │   │   │   ├── perl.cpython-312.pyc
│   │   │           │   │   │   ├── php.cpython-312.pyc
│   │   │           │   │   │   ├── python.cpython-312.pyc
│   │   │           │   │   │   ├── ruby.cpython-312.pyc
│   │   │           │   │   │   ├── scripting.cpython-312.pyc
│   │   │           │   │   │   ├── tcl.cpython-312.pyc
│   │   │           │   │   │   ├── web.cpython-312.pyc
│   │   │           │   │   │   └── webmisc.cpython-312.pyc
│   │   │           │   │   ├── _ada_builtins.py
│   │   │           │   │   ├── _asy_builtins.py
│   │   │           │   │   ├── _cl_builtins.py
│   │   │           │   │   ├── _cocoa_builtins.py
│   │   │           │   │   ├── _csound_builtins.py
│   │   │           │   │   ├── _css_builtins.py
│   │   │           │   │   ├── _googlesql_builtins.py
│   │   │           │   │   ├── _julia_builtins.py
│   │   │           │   │   ├── _lasso_builtins.py
│   │   │           │   │   ├── _lilypond_builtins.py
│   │   │           │   │   ├── _lua_builtins.py
│   │   │           │   │   ├── _luau_builtins.py
│   │   │           │   │   ├── _mapping.py
│   │   │           │   │   ├── _mql_builtins.py
│   │   │           │   │   ├── _mysql_builtins.py
│   │   │           │   │   ├── _openedge_builtins.py
│   │   │           │   │   ├── _php_builtins.py
│   │   │           │   │   ├── _postgres_builtins.py
│   │   │           │   │   ├── _qlik_builtins.py
│   │   │           │   │   ├── _scheme_builtins.py
│   │   │           │   │   ├── _scilab_builtins.py
│   │   │           │   │   ├── _sourcemod_builtins.py
│   │   │           │   │   ├── _stan_builtins.py
│   │   │           │   │   ├── _stata_builtins.py
│   │   │           │   │   ├── _tsql_builtins.py
│   │   │           │   │   ├── _usd_builtins.py
│   │   │           │   │   ├── _vbscript_builtins.py
│   │   │           │   │   ├── _vim_builtins.py
│   │   │           │   │   ├── actionscript.py
│   │   │           │   │   ├── ada.py
│   │   │           │   │   ├── agile.py
│   │   │           │   │   ├── algebra.py
│   │   │           │   │   ├── ambient.py
│   │   │           │   │   ├── amdgpu.py
│   │   │           │   │   ├── ampl.py
│   │   │           │   │   ├── apdlexer.py
│   │   │           │   │   ├── apl.py
│   │   │           │   │   ├── archetype.py
│   │   │           │   │   ├── arrow.py
│   │   │           │   │   ├── arturo.py
│   │   │           │   │   ├── asc.py
│   │   │           │   │   ├── asm.py
│   │   │           │   │   ├── asn1.py
│   │   │           │   │   ├── automation.py
│   │   │           │   │   ├── bare.py
│   │   │           │   │   ├── basic.py
│   │   │           │   │   ├── bdd.py
│   │   │           │   │   ├── berry.py
│   │   │           │   │   ├── bibtex.py
│   │   │           │   │   ├── blueprint.py
│   │   │           │   │   ├── boa.py
│   │   │           │   │   ├── bqn.py
│   │   │           │   │   ├── business.py
│   │   │           │   │   ├── c_cpp.py
│   │   │           │   │   ├── c_like.py
│   │   │           │   │   ├── capnproto.py
│   │   │           │   │   ├── carbon.py
│   │   │           │   │   ├── cddl.py
│   │   │           │   │   ├── chapel.py
│   │   │           │   │   ├── clean.py
│   │   │           │   │   ├── codeql.py
│   │   │           │   │   ├── comal.py
│   │   │           │   │   ├── compiled.py
│   │   │           │   │   ├── configs.py
│   │   │           │   │   ├── console.py
│   │   │           │   │   ├── cplint.py
│   │   │           │   │   ├── crystal.py
│   │   │           │   │   ├── csound.py
│   │   │           │   │   ├── css.py
│   │   │           │   │   ├── d.py
│   │   │           │   │   ├── dalvik.py
│   │   │           │   │   ├── data.py
│   │   │           │   │   ├── dax.py
│   │   │           │   │   ├── devicetree.py
│   │   │           │   │   ├── diff.py
│   │   │           │   │   ├── dns.py
│   │   │           │   │   ├── dotnet.py
│   │   │           │   │   ├── dsls.py
│   │   │           │   │   ├── dylan.py
│   │   │           │   │   ├── ecl.py
│   │   │           │   │   ├── eiffel.py
│   │   │           │   │   ├── elm.py
│   │   │           │   │   ├── elpi.py
│   │   │           │   │   ├── email.py
│   │   │           │   │   ├── erlang.py
│   │   │           │   │   ├── esoteric.py
│   │   │           │   │   ├── ezhil.py
│   │   │           │   │   ├── factor.py
│   │   │           │   │   ├── fantom.py
│   │   │           │   │   ├── felix.py
│   │   │           │   │   ├── fift.py
│   │   │           │   │   ├── floscript.py
│   │   │           │   │   ├── forth.py
│   │   │           │   │   ├── fortran.py
│   │   │           │   │   ├── foxpro.py
│   │   │           │   │   ├── freefem.py
│   │   │           │   │   ├── func.py
│   │   │           │   │   ├── functional.py
│   │   │           │   │   ├── futhark.py
│   │   │           │   │   ├── gcodelexer.py
│   │   │           │   │   ├── gdscript.py
│   │   │           │   │   ├── gleam.py
│   │   │           │   │   ├── go.py
│   │   │           │   │   ├── grammar_notation.py
│   │   │           │   │   ├── graph.py
│   │   │           │   │   ├── graphics.py
│   │   │           │   │   ├── graphql.py
│   │   │           │   │   ├── graphviz.py
│   │   │           │   │   ├── gsql.py
│   │   │           │   │   ├── hare.py
│   │   │           │   │   ├── haskell.py
│   │   │           │   │   ├── haxe.py
│   │   │           │   │   ├── hdl.py
│   │   │           │   │   ├── hexdump.py
│   │   │           │   │   ├── html.py
│   │   │           │   │   ├── idl.py
│   │   │           │   │   ├── igor.py
│   │   │           │   │   ├── inferno.py
│   │   │           │   │   ├── installers.py
│   │   │           │   │   ├── int_fiction.py
│   │   │           │   │   ├── iolang.py
│   │   │           │   │   ├── j.py
│   │   │           │   │   ├── javascript.py
│   │   │           │   │   ├── jmespath.py
│   │   │           │   │   ├── jslt.py
│   │   │           │   │   ├── json5.py
│   │   │           │   │   ├── jsonnet.py
│   │   │           │   │   ├── jsx.py
│   │   │           │   │   ├── julia.py
│   │   │           │   │   ├── jvm.py
│   │   │           │   │   ├── kuin.py
│   │   │           │   │   ├── kusto.py
│   │   │           │   │   ├── ldap.py
│   │   │           │   │   ├── lean.py
│   │   │           │   │   ├── lilypond.py
│   │   │           │   │   ├── lisp.py
│   │   │           │   │   ├── macaulay2.py
│   │   │           │   │   ├── make.py
│   │   │           │   │   ├── maple.py
│   │   │           │   │   ├── markup.py
│   │   │           │   │   ├── math.py
│   │   │           │   │   ├── matlab.py
│   │   │           │   │   ├── maxima.py
│   │   │           │   │   ├── meson.py
│   │   │           │   │   ├── mime.py
│   │   │           │   │   ├── minecraft.py
│   │   │           │   │   ├── mips.py
│   │   │           │   │   ├── ml.py
│   │   │           │   │   ├── modeling.py
│   │   │           │   │   ├── modula2.py
│   │   │           │   │   ├── mojo.py
│   │   │           │   │   ├── monte.py
│   │   │           │   │   ├── mosel.py
│   │   │           │   │   ├── ncl.py
│   │   │           │   │   ├── nimrod.py
│   │   │           │   │   ├── nit.py
│   │   │           │   │   ├── nix.py
│   │   │           │   │   ├── numbair.py
│   │   │           │   │   ├── oberon.py
│   │   │           │   │   ├── objective.py
│   │   │           │   │   ├── ooc.py
│   │   │           │   │   ├── openscad.py
│   │   │           │   │   ├── other.py
│   │   │           │   │   ├── parasail.py
│   │   │           │   │   ├── parsers.py
│   │   │           │   │   ├── pascal.py
│   │   │           │   │   ├── pawn.py
│   │   │           │   │   ├── pddl.py
│   │   │           │   │   ├── perl.py
│   │   │           │   │   ├── phix.py
│   │   │           │   │   ├── php.py
│   │   │           │   │   ├── pointless.py
│   │   │           │   │   ├── pony.py
│   │   │           │   │   ├── praat.py
│   │   │           │   │   ├── procfile.py
│   │   │           │   │   ├── prolog.py
│   │   │           │   │   ├── promql.py
│   │   │           │   │   ├── prql.py
│   │   │           │   │   ├── ptx.py
│   │   │           │   │   ├── python.py
│   │   │           │   │   ├── q.py
│   │   │           │   │   ├── qlik.py
│   │   │           │   │   ├── qvt.py
│   │   │           │   │   ├── r.py
│   │   │           │   │   ├── rdf.py
│   │   │           │   │   ├── rebol.py
│   │   │           │   │   ├── rego.py
│   │   │           │   │   ├── resource.py
│   │   │           │   │   ├── ride.py
│   │   │           │   │   ├── rita.py
│   │   │           │   │   ├── rnc.py
│   │   │           │   │   ├── roboconf.py
│   │   │           │   │   ├── robotframework.py
│   │   │           │   │   ├── ruby.py
│   │   │           │   │   ├── rust.py
│   │   │           │   │   ├── sas.py
│   │   │           │   │   ├── savi.py
│   │   │           │   │   ├── scdoc.py
│   │   │           │   │   ├── scripting.py
│   │   │           │   │   ├── sgf.py
│   │   │           │   │   ├── shell.py
│   │   │           │   │   ├── sieve.py
│   │   │           │   │   ├── slash.py
│   │   │           │   │   ├── smalltalk.py
│   │   │           │   │   ├── smithy.py
│   │   │           │   │   ├── smv.py
│   │   │           │   │   ├── snobol.py
│   │   │           │   │   ├── solidity.py
│   │   │           │   │   ├── soong.py
│   │   │           │   │   ├── sophia.py
│   │   │           │   │   ├── special.py
│   │   │           │   │   ├── spice.py
│   │   │           │   │   ├── sql.py
│   │   │           │   │   ├── srcinfo.py
│   │   │           │   │   ├── stata.py
│   │   │           │   │   ├── supercollider.py
│   │   │           │   │   ├── tablegen.py
│   │   │           │   │   ├── tact.py
│   │   │           │   │   ├── tal.py
│   │   │           │   │   ├── tcl.py
│   │   │           │   │   ├── teal.py
│   │   │           │   │   ├── templates.py
│   │   │           │   │   ├── teraterm.py
│   │   │           │   │   ├── testing.py
│   │   │           │   │   ├── text.py
│   │   │           │   │   ├── textedit.py
│   │   │           │   │   ├── textfmts.py
│   │   │           │   │   ├── theorem.py
│   │   │           │   │   ├── thingsdb.py
│   │   │           │   │   ├── tlb.py
│   │   │           │   │   ├── tls.py
│   │   │           │   │   ├── tnt.py
│   │   │           │   │   ├── trafficscript.py
│   │   │           │   │   ├── typoscript.py
│   │   │           │   │   ├── typst.py
│   │   │           │   │   ├── ul4.py
│   │   │           │   │   ├── unicon.py
│   │   │           │   │   ├── urbi.py
│   │   │           │   │   ├── usd.py
│   │   │           │   │   ├── varnish.py
│   │   │           │   │   ├── verification.py
│   │   │           │   │   ├── verifpal.py
│   │   │           │   │   ├── vip.py
│   │   │           │   │   ├── vyper.py
│   │   │           │   │   ├── web.py
│   │   │           │   │   ├── webassembly.py
│   │   │           │   │   ├── webidl.py
│   │   │           │   │   ├── webmisc.py
│   │   │           │   │   ├── wgsl.py
│   │   │           │   │   ├── whiley.py
│   │   │           │   │   ├── wowtoc.py
│   │   │           │   │   ├── wren.py
│   │   │           │   │   ├── x10.py
│   │   │           │   │   ├── xorg.py
│   │   │           │   │   ├── yang.py
│   │   │           │   │   ├── yara.py
│   │   │           │   │   └── zig.py
│   │   │           │   ├── modeline.py
│   │   │           │   ├── plugin.py
│   │   │           │   ├── regexopt.py
│   │   │           │   ├── scanner.py
│   │   │           │   ├── sphinxext.py
│   │   │           │   ├── style.py
│   │   │           │   ├── styles
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── _mapping.cpython-312.pyc
│   │   │           │   │   │   └── default.cpython-312.pyc
│   │   │           │   │   ├── _mapping.py
│   │   │           │   │   ├── abap.py
│   │   │           │   │   ├── algol.py
│   │   │           │   │   ├── algol_nu.py
│   │   │           │   │   ├── arduino.py
│   │   │           │   │   ├── autumn.py
│   │   │           │   │   ├── borland.py
│   │   │           │   │   ├── bw.py
│   │   │           │   │   ├── coffee.py
│   │   │           │   │   ├── colorful.py
│   │   │           │   │   ├── default.py
│   │   │           │   │   ├── dracula.py
│   │   │           │   │   ├── emacs.py
│   │   │           │   │   ├── friendly.py
│   │   │           │   │   ├── friendly_grayscale.py
│   │   │           │   │   ├── fruity.py
│   │   │           │   │   ├── gh_dark.py
│   │   │           │   │   ├── gruvbox.py
│   │   │           │   │   ├── igor.py
│   │   │           │   │   ├── inkpot.py
│   │   │           │   │   ├── lightbulb.py
│   │   │           │   │   ├── lilypond.py
│   │   │           │   │   ├── lovelace.py
│   │   │           │   │   ├── manni.py
│   │   │           │   │   ├── material.py
│   │   │           │   │   ├── monokai.py
│   │   │           │   │   ├── murphy.py
│   │   │           │   │   ├── native.py
│   │   │           │   │   ├── nord.py
│   │   │           │   │   ├── onedark.py
│   │   │           │   │   ├── paraiso_dark.py
│   │   │           │   │   ├── paraiso_light.py
│   │   │           │   │   ├── pastie.py
│   │   │           │   │   ├── perldoc.py
│   │   │           │   │   ├── rainbow_dash.py
│   │   │           │   │   ├── rrt.py
│   │   │           │   │   ├── sas.py
│   │   │           │   │   ├── solarized.py
│   │   │           │   │   ├── staroffice.py
│   │   │           │   │   ├── stata_dark.py
│   │   │           │   │   ├── stata_light.py
│   │   │           │   │   ├── tango.py
│   │   │           │   │   ├── trac.py
│   │   │           │   │   ├── vim.py
│   │   │           │   │   ├── vs.py
│   │   │           │   │   ├── xcode.py
│   │   │           │   │   └── zenburn.py
│   │   │           │   ├── token.py
│   │   │           │   ├── unistring.py
│   │   │           │   └── util.py
│   │   │           ├── pygments-2.19.1.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── entry_points.txt
│   │   │           │   └── licenses
│   │   │           │       ├── AUTHORS
│   │   │           │       └── LICENSE
│   │   │           ├── python_dateutil-2.9.0.post0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── top_level.txt
│   │   │           │   └── zip-safe
│   │   │           ├── python_dotenv-1.0.1.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── entry_points.txt
│   │   │           │   └── top_level.txt
│   │   │           ├── python_multipart
│   │   │           │   ├── __init__.py
│   │   │           │   ├── decoders.py
│   │   │           │   ├── exceptions.py
│   │   │           │   ├── multipart.py
│   │   │           │   └── py.typed
│   │   │           ├── python_multipart-0.0.20.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE.txt
│   │   │           ├── pytz
│   │   │           │   ├── __init__.py
│   │   │           │   ├── exceptions.py
│   │   │           │   ├── lazy.py
│   │   │           │   ├── reference.py
│   │   │           │   ├── tzfile.py
│   │   │           │   ├── tzinfo.py
│   │   │           │   └── zoneinfo
│   │   │           │       ├── Africa
│   │   │           │       │   ├── Abidjan
│   │   │           │       │   ├── Accra
│   │   │           │       │   ├── Addis_Ababa
│   │   │           │       │   ├── Algiers
│   │   │           │       │   ├── Asmara
│   │   │           │       │   ├── Asmera
│   │   │           │       │   ├── Bamako
│   │   │           │       │   ├── Bangui
│   │   │           │       │   ├── Banjul
│   │   │           │       │   ├── Bissau
│   │   │           │       │   ├── Blantyre
│   │   │           │       │   ├── Brazzaville
│   │   │           │       │   ├── Bujumbura
│   │   │           │       │   ├── Cairo
│   │   │           │       │   ├── Casablanca
│   │   │           │       │   ├── Ceuta
│   │   │           │       │   ├── Conakry
│   │   │           │       │   ├── Dakar
│   │   │           │       │   ├── Dar_es_Salaam
│   │   │           │       │   ├── Djibouti
│   │   │           │       │   ├── Douala
│   │   │           │       │   ├── El_Aaiun
│   │   │           │       │   ├── Freetown
│   │   │           │       │   ├── Gaborone
│   │   │           │       │   ├── Harare
│   │   │           │       │   ├── Johannesburg
│   │   │           │       │   ├── Juba
│   │   │           │       │   ├── Kampala
│   │   │           │       │   ├── Khartoum
│   │   │           │       │   ├── Kigali
│   │   │           │       │   ├── Kinshasa
│   │   │           │       │   ├── Lagos
│   │   │           │       │   ├── Libreville
│   │   │           │       │   ├── Lome
│   │   │           │       │   ├── Luanda
│   │   │           │       │   ├── Lubumbashi
│   │   │           │       │   ├── Lusaka
│   │   │           │       │   ├── Malabo
│   │   │           │       │   ├── Maputo
│   │   │           │       │   ├── Maseru
│   │   │           │       │   ├── Mbabane
│   │   │           │       │   ├── Mogadishu
│   │   │           │       │   ├── Monrovia
│   │   │           │       │   ├── Nairobi
│   │   │           │       │   ├── Ndjamena
│   │   │           │       │   ├── Niamey
│   │   │           │       │   ├── Nouakchott
│   │   │           │       │   ├── Ouagadougou
│   │   │           │       │   ├── Porto-Novo
│   │   │           │       │   ├── Sao_Tome
│   │   │           │       │   ├── Timbuktu
│   │   │           │       │   ├── Tripoli
│   │   │           │       │   ├── Tunis
│   │   │           │       │   └── Windhoek
│   │   │           │       ├── America
│   │   │           │       │   ├── Adak
│   │   │           │       │   ├── Anchorage
│   │   │           │       │   ├── Anguilla
│   │   │           │       │   ├── Antigua
│   │   │           │       │   ├── Araguaina
│   │   │           │       │   ├── Argentina
│   │   │           │       │   │   ├── Buenos_Aires
│   │   │           │       │   │   ├── Catamarca
│   │   │           │       │   │   ├── ComodRivadavia
│   │   │           │       │   │   ├── Cordoba
│   │   │           │       │   │   ├── Jujuy
│   │   │           │       │   │   ├── La_Rioja
│   │   │           │       │   │   ├── Mendoza
│   │   │           │       │   │   ├── Rio_Gallegos
│   │   │           │       │   │   ├── Salta
│   │   │           │       │   │   ├── San_Juan
│   │   │           │       │   │   ├── San_Luis
│   │   │           │       │   │   ├── Tucuman
│   │   │           │       │   │   └── Ushuaia
│   │   │           │       │   ├── Aruba
│   │   │           │       │   ├── Asuncion
│   │   │           │       │   ├── Atikokan
│   │   │           │       │   ├── Atka
│   │   │           │       │   ├── Bahia
│   │   │           │       │   ├── Bahia_Banderas
│   │   │           │       │   ├── Barbados
│   │   │           │       │   ├── Belem
│   │   │           │       │   ├── Belize
│   │   │           │       │   ├── Blanc-Sablon
│   │   │           │       │   ├── Boa_Vista
│   │   │           │       │   ├── Bogota
│   │   │           │       │   ├── Boise
│   │   │           │       │   ├── Buenos_Aires
│   │   │           │       │   ├── Cambridge_Bay
│   │   │           │       │   ├── Campo_Grande
│   │   │           │       │   ├── Cancun
│   │   │           │       │   ├── Caracas
│   │   │           │       │   ├── Catamarca
│   │   │           │       │   ├── Cayenne
│   │   │           │       │   ├── Cayman
│   │   │           │       │   ├── Chicago
│   │   │           │       │   ├── Chihuahua
│   │   │           │       │   ├── Ciudad_Juarez
│   │   │           │       │   ├── Coral_Harbour
│   │   │           │       │   ├── Cordoba
│   │   │           │       │   ├── Costa_Rica
│   │   │           │       │   ├── Creston
│   │   │           │       │   ├── Cuiaba
│   │   │           │       │   ├── Curacao
│   │   │           │       │   ├── Danmarkshavn
│   │   │           │       │   ├── Dawson
│   │   │           │       │   ├── Dawson_Creek
│   │   │           │       │   ├── Denver
│   │   │           │       │   ├── Detroit
│   │   │           │       │   ├── Dominica
│   │   │           │       │   ├── Edmonton
│   │   │           │       │   ├── Eirunepe
│   │   │           │       │   ├── El_Salvador
│   │   │           │       │   ├── Ensenada
│   │   │           │       │   ├── Fort_Nelson
│   │   │           │       │   ├── Fort_Wayne
│   │   │           │       │   ├── Fortaleza
│   │   │           │       │   ├── Glace_Bay
│   │   │           │       │   ├── Godthab
│   │   │           │       │   ├── Goose_Bay
│   │   │           │       │   ├── Grand_Turk
│   │   │           │       │   ├── Grenada
│   │   │           │       │   ├── Guadeloupe
│   │   │           │       │   ├── Guatemala
│   │   │           │       │   ├── Guayaquil
│   │   │           │       │   ├── Guyana
│   │   │           │       │   ├── Halifax
│   │   │           │       │   ├── Havana
│   │   │           │       │   ├── Hermosillo
│   │   │           │       │   ├── Indiana
│   │   │           │       │   │   ├── Indianapolis
│   │   │           │       │   │   ├── Knox
│   │   │           │       │   │   ├── Marengo
│   │   │           │       │   │   ├── Petersburg
│   │   │           │       │   │   ├── Tell_City
│   │   │           │       │   │   ├── Vevay
│   │   │           │       │   │   ├── Vincennes
│   │   │           │       │   │   └── Winamac
│   │   │           │       │   ├── Indianapolis
│   │   │           │       │   ├── Inuvik
│   │   │           │       │   ├── Iqaluit
│   │   │           │       │   ├── Jamaica
│   │   │           │       │   ├── Jujuy
│   │   │           │       │   ├── Juneau
│   │   │           │       │   ├── Kentucky
│   │   │           │       │   │   ├── Louisville
│   │   │           │       │   │   └── Monticello
│   │   │           │       │   ├── Knox_IN
│   │   │           │       │   ├── Kralendijk
│   │   │           │       │   ├── La_Paz
│   │   │           │       │   ├── Lima
│   │   │           │       │   ├── Los_Angeles
│   │   │           │       │   ├── Louisville
│   │   │           │       │   ├── Lower_Princes
│   │   │           │       │   ├── Maceio
│   │   │           │       │   ├── Managua
│   │   │           │       │   ├── Manaus
│   │   │           │       │   ├── Marigot
│   │   │           │       │   ├── Martinique
│   │   │           │       │   ├── Matamoros
│   │   │           │       │   ├── Mazatlan
│   │   │           │       │   ├── Mendoza
│   │   │           │       │   ├── Menominee
│   │   │           │       │   ├── Merida
│   │   │           │       │   ├── Metlakatla
│   │   │           │       │   ├── Mexico_City
│   │   │           │       │   ├── Miquelon
│   │   │           │       │   ├── Moncton
│   │   │           │       │   ├── Monterrey
│   │   │           │       │   ├── Montevideo
│   │   │           │       │   ├── Montreal
│   │   │           │       │   ├── Montserrat
│   │   │           │       │   ├── Nassau
│   │   │           │       │   ├── New_York
│   │   │           │       │   ├── Nipigon
│   │   │           │       │   ├── Nome
│   │   │           │       │   ├── Noronha
│   │   │           │       │   ├── North_Dakota
│   │   │           │       │   │   ├── Beulah
│   │   │           │       │   │   ├── Center
│   │   │           │       │   │   └── New_Salem
│   │   │           │       │   ├── Nuuk
│   │   │           │       │   ├── Ojinaga
│   │   │           │       │   ├── Panama
│   │   │           │       │   ├── Pangnirtung
│   │   │           │       │   ├── Paramaribo
│   │   │           │       │   ├── Phoenix
│   │   │           │       │   ├── Port-au-Prince
│   │   │           │       │   ├── Port_of_Spain
│   │   │           │       │   ├── Porto_Acre
│   │   │           │       │   ├── Porto_Velho
│   │   │           │       │   ├── Puerto_Rico
│   │   │           │       │   ├── Punta_Arenas
│   │   │           │       │   ├── Rainy_River
│   │   │           │       │   ├── Rankin_Inlet
│   │   │           │       │   ├── Recife
│   │   │           │       │   ├── Regina
│   │   │           │       │   ├── Resolute
│   │   │           │       │   ├── Rio_Branco
│   │   │           │       │   ├── Rosario
│   │   │           │       │   ├── Santa_Isabel
│   │   │           │       │   ├── Santarem
│   │   │           │       │   ├── Santiago
│   │   │           │       │   ├── Santo_Domingo
│   │   │           │       │   ├── Sao_Paulo
│   │   │           │       │   ├── Scoresbysund
│   │   │           │       │   ├── Shiprock
│   │   │           │       │   ├── Sitka
│   │   │           │       │   ├── St_Barthelemy
│   │   │           │       │   ├── St_Johns
│   │   │           │       │   ├── St_Kitts
│   │   │           │       │   ├── St_Lucia
│   │   │           │       │   ├── St_Thomas
│   │   │           │       │   ├── St_Vincent
│   │   │           │       │   ├── Swift_Current
│   │   │           │       │   ├── Tegucigalpa
│   │   │           │       │   ├── Thule
│   │   │           │       │   ├── Thunder_Bay
│   │   │           │       │   ├── Tijuana
│   │   │           │       │   ├── Toronto
│   │   │           │       │   ├── Tortola
│   │   │           │       │   ├── Vancouver
│   │   │           │       │   ├── Virgin
│   │   │           │       │   ├── Whitehorse
│   │   │           │       │   ├── Winnipeg
│   │   │           │       │   ├── Yakutat
│   │   │           │       │   └── Yellowknife
│   │   │           │       ├── Antarctica
│   │   │           │       │   ├── Casey
│   │   │           │       │   ├── Davis
│   │   │           │       │   ├── DumontDUrville
│   │   │           │       │   ├── Macquarie
│   │   │           │       │   ├── Mawson
│   │   │           │       │   ├── McMurdo
│   │   │           │       │   ├── Palmer
│   │   │           │       │   ├── Rothera
│   │   │           │       │   ├── South_Pole
│   │   │           │       │   ├── Syowa
│   │   │           │       │   ├── Troll
│   │   │           │       │   └── Vostok
│   │   │           │       ├── Arctic
│   │   │           │       │   └── Longyearbyen
│   │   │           │       ├── Asia
│   │   │           │       │   ├── Aden
│   │   │           │       │   ├── Almaty
│   │   │           │       │   ├── Amman
│   │   │           │       │   ├── Anadyr
│   │   │           │       │   ├── Aqtau
│   │   │           │       │   ├── Aqtobe
│   │   │           │       │   ├── Ashgabat
│   │   │           │       │   ├── Ashkhabad
│   │   │           │       │   ├── Atyrau
│   │   │           │       │   ├── Baghdad
│   │   │           │       │   ├── Bahrain
│   │   │           │       │   ├── Baku
│   │   │           │       │   ├── Bangkok
│   │   │           │       │   ├── Barnaul
│   │   │           │       │   ├── Beirut
│   │   │           │       │   ├── Bishkek
│   │   │           │       │   ├── Brunei
│   │   │           │       │   ├── Calcutta
│   │   │           │       │   ├── Chita
│   │   │           │       │   ├── Choibalsan
│   │   │           │       │   ├── Chongqing
│   │   │           │       │   ├── Chungking
│   │   │           │       │   ├── Colombo
│   │   │           │       │   ├── Dacca
│   │   │           │       │   ├── Damascus
│   │   │           │       │   ├── Dhaka
│   │   │           │       │   ├── Dili
│   │   │           │       │   ├── Dubai
│   │   │           │       │   ├── Dushanbe
│   │   │           │       │   ├── Famagusta
│   │   │           │       │   ├── Gaza
│   │   │           │       │   ├── Harbin
│   │   │           │       │   ├── Hebron
│   │   │           │       │   ├── Ho_Chi_Minh
│   │   │           │       │   ├── Hong_Kong
│   │   │           │       │   ├── Hovd
│   │   │           │       │   ├── Irkutsk
│   │   │           │       │   ├── Istanbul
│   │   │           │       │   ├── Jakarta
│   │   │           │       │   ├── Jayapura
│   │   │           │       │   ├── Jerusalem
│   │   │           │       │   ├── Kabul
│   │   │           │       │   ├── Kamchatka
│   │   │           │       │   ├── Karachi
│   │   │           │       │   ├── Kashgar
│   │   │           │       │   ├── Kathmandu
│   │   │           │       │   ├── Katmandu
│   │   │           │       │   ├── Khandyga
│   │   │           │       │   ├── Kolkata
│   │   │           │       │   ├── Krasnoyarsk
│   │   │           │       │   ├── Kuala_Lumpur
│   │   │           │       │   ├── Kuching
│   │   │           │       │   ├── Kuwait
│   │   │           │       │   ├── Macao
│   │   │           │       │   ├── Macau
│   │   │           │       │   ├── Magadan
│   │   │           │       │   ├── Makassar
│   │   │           │       │   ├── Manila
│   │   │           │       │   ├── Muscat
│   │   │           │       │   ├── Nicosia
│   │   │           │       │   ├── Novokuznetsk
│   │   │           │       │   ├── Novosibirsk
│   │   │           │       │   ├── Omsk
│   │   │           │       │   ├── Oral
│   │   │           │       │   ├── Phnom_Penh
│   │   │           │       │   ├── Pontianak
│   │   │           │       │   ├── Pyongyang
│   │   │           │       │   ├── Qatar
│   │   │           │       │   ├── Qostanay
│   │   │           │       │   ├── Qyzylorda
│   │   │           │       │   ├── Rangoon
│   │   │           │       │   ├── Riyadh
│   │   │           │       │   ├── Saigon
│   │   │           │       │   ├── Sakhalin
│   │   │           │       │   ├── Samarkand
│   │   │           │       │   ├── Seoul
│   │   │           │       │   ├── Shanghai
│   │   │           │       │   ├── Singapore
│   │   │           │       │   ├── Srednekolymsk
│   │   │           │       │   ├── Taipei
│   │   │           │       │   ├── Tashkent
│   │   │           │       │   ├── Tbilisi
│   │   │           │       │   ├── Tehran
│   │   │           │       │   ├── Tel_Aviv
│   │   │           │       │   ├── Thimbu
│   │   │           │       │   ├── Thimphu
│   │   │           │       │   ├── Tokyo
│   │   │           │       │   ├── Tomsk
│   │   │           │       │   ├── Ujung_Pandang
│   │   │           │       │   ├── Ulaanbaatar
│   │   │           │       │   ├── Ulan_Bator
│   │   │           │       │   ├── Urumqi
│   │   │           │       │   ├── Ust-Nera
│   │   │           │       │   ├── Vientiane
│   │   │           │       │   ├── Vladivostok
│   │   │           │       │   ├── Yakutsk
│   │   │           │       │   ├── Yangon
│   │   │           │       │   ├── Yekaterinburg
│   │   │           │       │   └── Yerevan
│   │   │           │       ├── Atlantic
│   │   │           │       │   ├── Azores
│   │   │           │       │   ├── Bermuda
│   │   │           │       │   ├── Canary
│   │   │           │       │   ├── Cape_Verde
│   │   │           │       │   ├── Faeroe
│   │   │           │       │   ├── Faroe
│   │   │           │       │   ├── Jan_Mayen
│   │   │           │       │   ├── Madeira
│   │   │           │       │   ├── Reykjavik
│   │   │           │       │   ├── South_Georgia
│   │   │           │       │   ├── St_Helena
│   │   │           │       │   └── Stanley
│   │   │           │       ├── Australia
│   │   │           │       │   ├── ACT
│   │   │           │       │   ├── Adelaide
│   │   │           │       │   ├── Brisbane
│   │   │           │       │   ├── Broken_Hill
│   │   │           │       │   ├── Canberra
│   │   │           │       │   ├── Currie
│   │   │           │       │   ├── Darwin
│   │   │           │       │   ├── Eucla
│   │   │           │       │   ├── Hobart
│   │   │           │       │   ├── LHI
│   │   │           │       │   ├── Lindeman
│   │   │           │       │   ├── Lord_Howe
│   │   │           │       │   ├── Melbourne
│   │   │           │       │   ├── NSW
│   │   │           │       │   ├── North
│   │   │           │       │   ├── Perth
│   │   │           │       │   ├── Queensland
│   │   │           │       │   ├── South
│   │   │           │       │   ├── Sydney
│   │   │           │       │   ├── Tasmania
│   │   │           │       │   ├── Victoria
│   │   │           │       │   ├── West
│   │   │           │       │   └── Yancowinna
│   │   │           │       ├── Brazil
│   │   │           │       │   ├── Acre
│   │   │           │       │   ├── DeNoronha
│   │   │           │       │   ├── East
│   │   │           │       │   └── West
│   │   │           │       ├── CET
│   │   │           │       ├── CST6CDT
│   │   │           │       ├── Canada
│   │   │           │       │   ├── Atlantic
│   │   │           │       │   ├── Central
│   │   │           │       │   ├── Eastern
│   │   │           │       │   ├── Mountain
│   │   │           │       │   ├── Newfoundland
│   │   │           │       │   ├── Pacific
│   │   │           │       │   ├── Saskatchewan
│   │   │           │       │   └── Yukon
│   │   │           │       ├── Chile
│   │   │           │       │   ├── Continental
│   │   │           │       │   └── EasterIsland
│   │   │           │       ├── Cuba
│   │   │           │       ├── EET
│   │   │           │       ├── EST
│   │   │           │       ├── EST5EDT
│   │   │           │       ├── Egypt
│   │   │           │       ├── Eire
│   │   │           │       ├── Etc
│   │   │           │       │   ├── GMT
│   │   │           │       │   ├── GMT+0
│   │   │           │       │   ├── GMT+1
│   │   │           │       │   ├── GMT+10
│   │   │           │       │   ├── GMT+11
│   │   │           │       │   ├── GMT+12
│   │   │           │       │   ├── GMT+2
│   │   │           │       │   ├── GMT+3
│   │   │           │       │   ├── GMT+4
│   │   │           │       │   ├── GMT+5
│   │   │           │       │   ├── GMT+6
│   │   │           │       │   ├── GMT+7
│   │   │           │       │   ├── GMT+8
│   │   │           │       │   ├── GMT+9
│   │   │           │       │   ├── GMT-0
│   │   │           │       │   ├── GMT-1
│   │   │           │       │   ├── GMT-10
│   │   │           │       │   ├── GMT-11
│   │   │           │       │   ├── GMT-12
│   │   │           │       │   ├── GMT-13
│   │   │           │       │   ├── GMT-14
│   │   │           │       │   ├── GMT-2
│   │   │           │       │   ├── GMT-3
│   │   │           │       │   ├── GMT-4
│   │   │           │       │   ├── GMT-5
│   │   │           │       │   ├── GMT-6
│   │   │           │       │   ├── GMT-7
│   │   │           │       │   ├── GMT-8
│   │   │           │       │   ├── GMT-9
│   │   │           │       │   ├── GMT0
│   │   │           │       │   ├── Greenwich
│   │   │           │       │   ├── UCT
│   │   │           │       │   ├── UTC
│   │   │           │       │   ├── Universal
│   │   │           │       │   └── Zulu
│   │   │           │       ├── Europe
│   │   │           │       │   ├── Amsterdam
│   │   │           │       │   ├── Andorra
│   │   │           │       │   ├── Astrakhan
│   │   │           │       │   ├── Athens
│   │   │           │       │   ├── Belfast
│   │   │           │       │   ├── Belgrade
│   │   │           │       │   ├── Berlin
│   │   │           │       │   ├── Bratislava
│   │   │           │       │   ├── Brussels
│   │   │           │       │   ├── Bucharest
│   │   │           │       │   ├── Budapest
│   │   │           │       │   ├── Busingen
│   │   │           │       │   ├── Chisinau
│   │   │           │       │   ├── Copenhagen
│   │   │           │       │   ├── Dublin
│   │   │           │       │   ├── Gibraltar
│   │   │           │       │   ├── Guernsey
│   │   │           │       │   ├── Helsinki
│   │   │           │       │   ├── Isle_of_Man
│   │   │           │       │   ├── Istanbul
│   │   │           │       │   ├── Jersey
│   │   │           │       │   ├── Kaliningrad
│   │   │           │       │   ├── Kiev
│   │   │           │       │   ├── Kirov
│   │   │           │       │   ├── Kyiv
│   │   │           │       │   ├── Lisbon
│   │   │           │       │   ├── Ljubljana
│   │   │           │       │   ├── London
│   │   │           │       │   ├── Luxembourg
│   │   │           │       │   ├── Madrid
│   │   │           │       │   ├── Malta
│   │   │           │       │   ├── Mariehamn
│   │   │           │       │   ├── Minsk
│   │   │           │       │   ├── Monaco
│   │   │           │       │   ├── Moscow
│   │   │           │       │   ├── Nicosia
│   │   │           │       │   ├── Oslo
│   │   │           │       │   ├── Paris
│   │   │           │       │   ├── Podgorica
│   │   │           │       │   ├── Prague
│   │   │           │       │   ├── Riga
│   │   │           │       │   ├── Rome
│   │   │           │       │   ├── Samara
│   │   │           │       │   ├── San_Marino
│   │   │           │       │   ├── Sarajevo
│   │   │           │       │   ├── Saratov
│   │   │           │       │   ├── Simferopol
│   │   │           │       │   ├── Skopje
│   │   │           │       │   ├── Sofia
│   │   │           │       │   ├── Stockholm
│   │   │           │       │   ├── Tallinn
│   │   │           │       │   ├── Tirane
│   │   │           │       │   ├── Tiraspol
│   │   │           │       │   ├── Ulyanovsk
│   │   │           │       │   ├── Uzhgorod
│   │   │           │       │   ├── Vaduz
│   │   │           │       │   ├── Vatican
│   │   │           │       │   ├── Vienna
│   │   │           │       │   ├── Vilnius
│   │   │           │       │   ├── Volgograd
│   │   │           │       │   ├── Warsaw
│   │   │           │       │   ├── Zagreb
│   │   │           │       │   ├── Zaporozhye
│   │   │           │       │   └── Zurich
│   │   │           │       ├── Factory
│   │   │           │       ├── GB
│   │   │           │       ├── GB-Eire
│   │   │           │       ├── GMT
│   │   │           │       ├── GMT+0
│   │   │           │       ├── GMT-0
│   │   │           │       ├── GMT0
│   │   │           │       ├── Greenwich
│   │   │           │       ├── HST
│   │   │           │       ├── Hongkong
│   │   │           │       ├── Iceland
│   │   │           │       ├── Indian
│   │   │           │       │   ├── Antananarivo
│   │   │           │       │   ├── Chagos
│   │   │           │       │   ├── Christmas
│   │   │           │       │   ├── Cocos
│   │   │           │       │   ├── Comoro
│   │   │           │       │   ├── Kerguelen
│   │   │           │       │   ├── Mahe
│   │   │           │       │   ├── Maldives
│   │   │           │       │   ├── Mauritius
│   │   │           │       │   ├── Mayotte
│   │   │           │       │   └── Reunion
│   │   │           │       ├── Iran
│   │   │           │       ├── Israel
│   │   │           │       ├── Jamaica
│   │   │           │       ├── Japan
│   │   │           │       ├── Kwajalein
│   │   │           │       ├── Libya
│   │   │           │       ├── MET
│   │   │           │       ├── MST
│   │   │           │       ├── MST7MDT
│   │   │           │       ├── Mexico
│   │   │           │       │   ├── BajaNorte
│   │   │           │       │   ├── BajaSur
│   │   │           │       │   └── General
│   │   │           │       ├── NZ
│   │   │           │       ├── NZ-CHAT
│   │   │           │       ├── Navajo
│   │   │           │       ├── PRC
│   │   │           │       ├── PST8PDT
│   │   │           │       ├── Pacific
│   │   │           │       │   ├── Apia
│   │   │           │       │   ├── Auckland
│   │   │           │       │   ├── Bougainville
│   │   │           │       │   ├── Chatham
│   │   │           │       │   ├── Chuuk
│   │   │           │       │   ├── Easter
│   │   │           │       │   ├── Efate
│   │   │           │       │   ├── Enderbury
│   │   │           │       │   ├── Fakaofo
│   │   │           │       │   ├── Fiji
│   │   │           │       │   ├── Funafuti
│   │   │           │       │   ├── Galapagos
│   │   │           │       │   ├── Gambier
│   │   │           │       │   ├── Guadalcanal
│   │   │           │       │   ├── Guam
│   │   │           │       │   ├── Honolulu
│   │   │           │       │   ├── Johnston
│   │   │           │       │   ├── Kanton
│   │   │           │       │   ├── Kiritimati
│   │   │           │       │   ├── Kosrae
│   │   │           │       │   ├── Kwajalein
│   │   │           │       │   ├── Majuro
│   │   │           │       │   ├── Marquesas
│   │   │           │       │   ├── Midway
│   │   │           │       │   ├── Nauru
│   │   │           │       │   ├── Niue
│   │   │           │       │   ├── Norfolk
│   │   │           │       │   ├── Noumea
│   │   │           │       │   ├── Pago_Pago
│   │   │           │       │   ├── Palau
│   │   │           │       │   ├── Pitcairn
│   │   │           │       │   ├── Pohnpei
│   │   │           │       │   ├── Ponape
│   │   │           │       │   ├── Port_Moresby
│   │   │           │       │   ├── Rarotonga
│   │   │           │       │   ├── Saipan
│   │   │           │       │   ├── Samoa
│   │   │           │       │   ├── Tahiti
│   │   │           │       │   ├── Tarawa
│   │   │           │       │   ├── Tongatapu
│   │   │           │       │   ├── Truk
│   │   │           │       │   ├── Wake
│   │   │           │       │   ├── Wallis
│   │   │           │       │   └── Yap
│   │   │           │       ├── Poland
│   │   │           │       ├── Portugal
│   │   │           │       ├── ROC
│   │   │           │       ├── ROK
│   │   │           │       ├── Singapore
│   │   │           │       ├── Turkey
│   │   │           │       ├── UCT
│   │   │           │       ├── US
│   │   │           │       │   ├── Alaska
│   │   │           │       │   ├── Aleutian
│   │   │           │       │   ├── Arizona
│   │   │           │       │   ├── Central
│   │   │           │       │   ├── East-Indiana
│   │   │           │       │   ├── Eastern
│   │   │           │       │   ├── Hawaii
│   │   │           │       │   ├── Indiana-Starke
│   │   │           │       │   ├── Michigan
│   │   │           │       │   ├── Mountain
│   │   │           │       │   ├── Pacific
│   │   │           │       │   └── Samoa
│   │   │           │       ├── UTC
│   │   │           │       ├── Universal
│   │   │           │       ├── W-SU
│   │   │           │       ├── WET
│   │   │           │       ├── Zulu
│   │   │           │       ├── iso3166.tab
│   │   │           │       ├── leapseconds
│   │   │           │       ├── tzdata.zi
│   │   │           │       ├── zone.tab
│   │   │           │       ├── zone1970.tab
│   │   │           │       └── zonenow.tab
│   │   │           ├── pytz-2025.1.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE.txt
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── top_level.txt
│   │   │           │   └── zip-safe
│   │   │           ├── rich
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __main__.py
│   │   │           │   ├── _cell_widths.py
│   │   │           │   ├── _emoji_codes.py
│   │   │           │   ├── _emoji_replace.py
│   │   │           │   ├── _export_format.py
│   │   │           │   ├── _extension.py
│   │   │           │   ├── _fileno.py
│   │   │           │   ├── _inspect.py
│   │   │           │   ├── _log_render.py
│   │   │           │   ├── _loop.py
│   │   │           │   ├── _null_file.py
│   │   │           │   ├── _palettes.py
│   │   │           │   ├── _pick.py
│   │   │           │   ├── _ratio.py
│   │   │           │   ├── _spinners.py
│   │   │           │   ├── _stack.py
│   │   │           │   ├── _timer.py
│   │   │           │   ├── _win32_console.py
│   │   │           │   ├── _windows.py
│   │   │           │   ├── _windows_renderer.py
│   │   │           │   ├── _wrap.py
│   │   │           │   ├── abc.py
│   │   │           │   ├── align.py
│   │   │           │   ├── ansi.py
│   │   │           │   ├── bar.py
│   │   │           │   ├── box.py
│   │   │           │   ├── cells.py
│   │   │           │   ├── color.py
│   │   │           │   ├── color_triplet.py
│   │   │           │   ├── columns.py
│   │   │           │   ├── console.py
│   │   │           │   ├── constrain.py
│   │   │           │   ├── containers.py
│   │   │           │   ├── control.py
│   │   │           │   ├── default_styles.py
│   │   │           │   ├── diagnose.py
│   │   │           │   ├── emoji.py
│   │   │           │   ├── errors.py
│   │   │           │   ├── file_proxy.py
│   │   │           │   ├── filesize.py
│   │   │           │   ├── highlighter.py
│   │   │           │   ├── json.py
│   │   │           │   ├── jupyter.py
│   │   │           │   ├── layout.py
│   │   │           │   ├── live.py
│   │   │           │   ├── live_render.py
│   │   │           │   ├── logging.py
│   │   │           │   ├── markdown.py
│   │   │           │   ├── markup.py
│   │   │           │   ├── measure.py
│   │   │           │   ├── padding.py
│   │   │           │   ├── pager.py
│   │   │           │   ├── palette.py
│   │   │           │   ├── panel.py
│   │   │           │   ├── pretty.py
│   │   │           │   ├── progress.py
│   │   │           │   ├── progress_bar.py
│   │   │           │   ├── prompt.py
│   │   │           │   ├── protocol.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── region.py
│   │   │           │   ├── repr.py
│   │   │           │   ├── rule.py
│   │   │           │   ├── scope.py
│   │   │           │   ├── screen.py
│   │   │           │   ├── segment.py
│   │   │           │   ├── spinner.py
│   │   │           │   ├── status.py
│   │   │           │   ├── style.py
│   │   │           │   ├── styled.py
│   │   │           │   ├── syntax.py
│   │   │           │   ├── table.py
│   │   │           │   ├── terminal_theme.py
│   │   │           │   ├── text.py
│   │   │           │   ├── theme.py
│   │   │           │   ├── themes.py
│   │   │           │   ├── traceback.py
│   │   │           │   └── tree.py
│   │   │           ├── rich-13.9.4.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   └── WHEEL
│   │   │           ├── rich_toolkit
│   │   │           │   ├── __init__.py
│   │   │           │   ├── input.py
│   │   │           │   ├── menu.py
│   │   │           │   ├── progress.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── styles
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── fancy.py
│   │   │           │   │   ├── minimal.py
│   │   │           │   │   └── tagged.py
│   │   │           │   ├── toolkit.py
│   │   │           │   └── utils
│   │   │           │       ├── __init__.py
│   │   │           │       └── colors.py
│   │   │           ├── rich_toolkit-0.13.2.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE
│   │   │           ├── shellingham
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _core.py
│   │   │           │   ├── nt.py
│   │   │           │   └── posix
│   │   │           │       ├── __init__.py
│   │   │           │       ├── _core.py
│   │   │           │       ├── proc.py
│   │   │           │       └── ps.py
│   │   │           ├── shellingham-1.5.4.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── top_level.txt
│   │   │           │   └── zip-safe
│   │   │           ├── six-1.17.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── top_level.txt
│   │   │           ├── six.py
│   │   │           ├── sniffio
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _impl.py
│   │   │           │   ├── _tests
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   └── test_sniffio.py
│   │   │           │   ├── _version.py
│   │   │           │   └── py.typed
│   │   │           ├── sniffio-1.3.1.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── LICENSE.APACHE2
│   │   │           │   ├── LICENSE.MIT
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── top_level.txt
│   │   │           ├── sqlalchemy
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __pycache__
│   │   │           │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   ├── exc.cpython-312.pyc
│   │   │           │   │   ├── inspection.cpython-312.pyc
│   │   │           │   │   ├── log.cpython-312.pyc
│   │   │           │   │   ├── schema.cpython-312.pyc
│   │   │           │   │   └── types.cpython-312.pyc
│   │   │           │   ├── connectors
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── aioodbc.py
│   │   │           │   │   ├── asyncio.py
│   │   │           │   │   └── pyodbc.py
│   │   │           │   ├── cyextension
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   └── __init__.cpython-312.pyc
│   │   │           │   │   ├── collections.cpython-312-x86_64-linux-gnu.so
│   │   │           │   │   ├── collections.pyx
│   │   │           │   │   ├── immutabledict.cpython-312-x86_64-linux-gnu.so
│   │   │           │   │   ├── immutabledict.pxd
│   │   │           │   │   ├── immutabledict.pyx
│   │   │           │   │   ├── processors.cpython-312-x86_64-linux-gnu.so
│   │   │           │   │   ├── processors.pyx
│   │   │           │   │   ├── resultproxy.cpython-312-x86_64-linux-gnu.so
│   │   │           │   │   ├── resultproxy.pyx
│   │   │           │   │   ├── util.cpython-312-x86_64-linux-gnu.so
│   │   │           │   │   └── util.pyx
│   │   │           │   ├── dialects
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   └── _typing.cpython-312.pyc
│   │   │           │   │   ├── _typing.py
│   │   │           │   │   ├── mssql
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   ├── aioodbc.py
│   │   │           │   │   │   ├── base.py
│   │   │           │   │   │   ├── information_schema.py
│   │   │           │   │   │   ├── json.py
│   │   │           │   │   │   ├── provision.py
│   │   │           │   │   │   ├── pymssql.py
│   │   │           │   │   │   └── pyodbc.py
│   │   │           │   │   ├── mysql
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   ├── aiomysql.py
│   │   │           │   │   │   ├── asyncmy.py
│   │   │           │   │   │   ├── base.py
│   │   │           │   │   │   ├── cymysql.py
│   │   │           │   │   │   ├── dml.py
│   │   │           │   │   │   ├── enumerated.py
│   │   │           │   │   │   ├── expression.py
│   │   │           │   │   │   ├── json.py
│   │   │           │   │   │   ├── mariadb.py
│   │   │           │   │   │   ├── mariadbconnector.py
│   │   │           │   │   │   ├── mysqlconnector.py
│   │   │           │   │   │   ├── mysqldb.py
│   │   │           │   │   │   ├── provision.py
│   │   │           │   │   │   ├── pymysql.py
│   │   │           │   │   │   ├── pyodbc.py
│   │   │           │   │   │   ├── reflection.py
│   │   │           │   │   │   ├── reserved_words.py
│   │   │           │   │   │   └── types.py
│   │   │           │   │   ├── oracle
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   ├── base.py
│   │   │           │   │   │   ├── cx_oracle.py
│   │   │           │   │   │   ├── dictionary.py
│   │   │           │   │   │   ├── oracledb.py
│   │   │           │   │   │   ├── provision.py
│   │   │           │   │   │   └── types.py
│   │   │           │   │   ├── postgresql
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   ├── __pycache__
│   │   │           │   │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   │   ├── _psycopg_common.cpython-312.pyc
│   │   │           │   │   │   │   ├── array.cpython-312.pyc
│   │   │           │   │   │   │   ├── asyncpg.cpython-312.pyc
│   │   │           │   │   │   │   ├── base.cpython-312.pyc
│   │   │           │   │   │   │   ├── dml.cpython-312.pyc
│   │   │           │   │   │   │   ├── ext.cpython-312.pyc
│   │   │           │   │   │   │   ├── hstore.cpython-312.pyc
│   │   │           │   │   │   │   ├── json.cpython-312.pyc
│   │   │           │   │   │   │   ├── named_types.cpython-312.pyc
│   │   │           │   │   │   │   ├── operators.cpython-312.pyc
│   │   │           │   │   │   │   ├── pg8000.cpython-312.pyc
│   │   │           │   │   │   │   ├── pg_catalog.cpython-312.pyc
│   │   │           │   │   │   │   ├── psycopg.cpython-312.pyc
│   │   │           │   │   │   │   ├── psycopg2.cpython-312.pyc
│   │   │           │   │   │   │   ├── psycopg2cffi.cpython-312.pyc
│   │   │           │   │   │   │   ├── ranges.cpython-312.pyc
│   │   │           │   │   │   │   └── types.cpython-312.pyc
│   │   │           │   │   │   ├── _psycopg_common.py
│   │   │           │   │   │   ├── array.py
│   │   │           │   │   │   ├── asyncpg.py
│   │   │           │   │   │   ├── base.py
│   │   │           │   │   │   ├── dml.py
│   │   │           │   │   │   ├── ext.py
│   │   │           │   │   │   ├── hstore.py
│   │   │           │   │   │   ├── json.py
│   │   │           │   │   │   ├── named_types.py
│   │   │           │   │   │   ├── operators.py
│   │   │           │   │   │   ├── pg8000.py
│   │   │           │   │   │   ├── pg_catalog.py
│   │   │           │   │   │   ├── provision.py
│   │   │           │   │   │   ├── psycopg.py
│   │   │           │   │   │   ├── psycopg2.py
│   │   │           │   │   │   ├── psycopg2cffi.py
│   │   │           │   │   │   ├── ranges.py
│   │   │           │   │   │   └── types.py
│   │   │           │   │   ├── sqlite
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   ├── __pycache__
│   │   │           │   │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   │   ├── aiosqlite.cpython-312.pyc
│   │   │           │   │   │   │   ├── base.cpython-312.pyc
│   │   │           │   │   │   │   ├── dml.cpython-312.pyc
│   │   │           │   │   │   │   ├── json.cpython-312.pyc
│   │   │           │   │   │   │   ├── pysqlcipher.cpython-312.pyc
│   │   │           │   │   │   │   └── pysqlite.cpython-312.pyc
│   │   │           │   │   │   ├── aiosqlite.py
│   │   │           │   │   │   ├── base.py
│   │   │           │   │   │   ├── dml.py
│   │   │           │   │   │   ├── json.py
│   │   │           │   │   │   ├── provision.py
│   │   │           │   │   │   ├── pysqlcipher.py
│   │   │           │   │   │   └── pysqlite.py
│   │   │           │   │   └── type_migration_guidelines.txt
│   │   │           │   ├── engine
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── _py_processors.cpython-312.pyc
│   │   │           │   │   │   ├── base.cpython-312.pyc
│   │   │           │   │   │   ├── characteristics.cpython-312.pyc
│   │   │           │   │   │   ├── create.cpython-312.pyc
│   │   │           │   │   │   ├── cursor.cpython-312.pyc
│   │   │           │   │   │   ├── default.cpython-312.pyc
│   │   │           │   │   │   ├── events.cpython-312.pyc
│   │   │           │   │   │   ├── interfaces.cpython-312.pyc
│   │   │           │   │   │   ├── mock.cpython-312.pyc
│   │   │           │   │   │   ├── processors.cpython-312.pyc
│   │   │           │   │   │   ├── reflection.cpython-312.pyc
│   │   │           │   │   │   ├── result.cpython-312.pyc
│   │   │           │   │   │   ├── row.cpython-312.pyc
│   │   │           │   │   │   ├── strategies.cpython-312.pyc
│   │   │           │   │   │   ├── url.cpython-312.pyc
│   │   │           │   │   │   └── util.cpython-312.pyc
│   │   │           │   │   ├── _py_processors.py
│   │   │           │   │   ├── _py_row.py
│   │   │           │   │   ├── _py_util.py
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── characteristics.py
│   │   │           │   │   ├── create.py
│   │   │           │   │   ├── cursor.py
│   │   │           │   │   ├── default.py
│   │   │           │   │   ├── events.py
│   │   │           │   │   ├── interfaces.py
│   │   │           │   │   ├── mock.py
│   │   │           │   │   ├── processors.py
│   │   │           │   │   ├── reflection.py
│   │   │           │   │   ├── result.py
│   │   │           │   │   ├── row.py
│   │   │           │   │   ├── strategies.py
│   │   │           │   │   ├── url.py
│   │   │           │   │   └── util.py
│   │   │           │   ├── event
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── api.cpython-312.pyc
│   │   │           │   │   │   ├── attr.cpython-312.pyc
│   │   │           │   │   │   ├── base.cpython-312.pyc
│   │   │           │   │   │   ├── legacy.cpython-312.pyc
│   │   │           │   │   │   └── registry.cpython-312.pyc
│   │   │           │   │   ├── api.py
│   │   │           │   │   ├── attr.py
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── legacy.py
│   │   │           │   │   └── registry.py
│   │   │           │   ├── events.py
│   │   │           │   ├── exc.py
│   │   │           │   ├── ext
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   └── compiler.cpython-312.pyc
│   │   │           │   │   ├── associationproxy.py
│   │   │           │   │   ├── asyncio
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   ├── __pycache__
│   │   │           │   │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   │   ├── base.cpython-312.pyc
│   │   │           │   │   │   │   ├── engine.cpython-312.pyc
│   │   │           │   │   │   │   ├── exc.cpython-312.pyc
│   │   │           │   │   │   │   ├── result.cpython-312.pyc
│   │   │           │   │   │   │   ├── scoping.cpython-312.pyc
│   │   │           │   │   │   │   └── session.cpython-312.pyc
│   │   │           │   │   │   ├── base.py
│   │   │           │   │   │   ├── engine.py
│   │   │           │   │   │   ├── exc.py
│   │   │           │   │   │   ├── result.py
│   │   │           │   │   │   ├── scoping.py
│   │   │           │   │   │   └── session.py
│   │   │           │   │   ├── automap.py
│   │   │           │   │   ├── baked.py
│   │   │           │   │   ├── compiler.py
│   │   │           │   │   ├── declarative
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   └── extensions.py
│   │   │           │   │   ├── horizontal_shard.py
│   │   │           │   │   ├── hybrid.py
│   │   │           │   │   ├── indexable.py
│   │   │           │   │   ├── instrumentation.py
│   │   │           │   │   ├── mutable.py
│   │   │           │   │   ├── mypy
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   ├── apply.py
│   │   │           │   │   │   ├── decl_class.py
│   │   │           │   │   │   ├── infer.py
│   │   │           │   │   │   ├── names.py
│   │   │           │   │   │   ├── plugin.py
│   │   │           │   │   │   └── util.py
│   │   │           │   │   ├── orderinglist.py
│   │   │           │   │   └── serializer.py
│   │   │           │   ├── future
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   └── engine.cpython-312.pyc
│   │   │           │   │   └── engine.py
│   │   │           │   ├── inspection.py
│   │   │           │   ├── log.py
│   │   │           │   ├── orm
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── _orm_constructors.cpython-312.pyc
│   │   │           │   │   │   ├── _typing.cpython-312.pyc
│   │   │           │   │   │   ├── attributes.cpython-312.pyc
│   │   │           │   │   │   ├── base.cpython-312.pyc
│   │   │           │   │   │   ├── bulk_persistence.cpython-312.pyc
│   │   │           │   │   │   ├── clsregistry.cpython-312.pyc
│   │   │           │   │   │   ├── collections.cpython-312.pyc
│   │   │           │   │   │   ├── context.cpython-312.pyc
│   │   │           │   │   │   ├── decl_api.cpython-312.pyc
│   │   │           │   │   │   ├── decl_base.cpython-312.pyc
│   │   │           │   │   │   ├── dependency.cpython-312.pyc
│   │   │           │   │   │   ├── descriptor_props.cpython-312.pyc
│   │   │           │   │   │   ├── dynamic.cpython-312.pyc
│   │   │           │   │   │   ├── evaluator.cpython-312.pyc
│   │   │           │   │   │   ├── events.cpython-312.pyc
│   │   │           │   │   │   ├── exc.cpython-312.pyc
│   │   │           │   │   │   ├── identity.cpython-312.pyc
│   │   │           │   │   │   ├── instrumentation.cpython-312.pyc
│   │   │           │   │   │   ├── interfaces.cpython-312.pyc
│   │   │           │   │   │   ├── loading.cpython-312.pyc
│   │   │           │   │   │   ├── mapped_collection.cpython-312.pyc
│   │   │           │   │   │   ├── mapper.cpython-312.pyc
│   │   │           │   │   │   ├── path_registry.cpython-312.pyc
│   │   │           │   │   │   ├── persistence.cpython-312.pyc
│   │   │           │   │   │   ├── properties.cpython-312.pyc
│   │   │           │   │   │   ├── query.cpython-312.pyc
│   │   │           │   │   │   ├── relationships.cpython-312.pyc
│   │   │           │   │   │   ├── scoping.cpython-312.pyc
│   │   │           │   │   │   ├── session.cpython-312.pyc
│   │   │           │   │   │   ├── state.cpython-312.pyc
│   │   │           │   │   │   ├── state_changes.cpython-312.pyc
│   │   │           │   │   │   ├── strategies.cpython-312.pyc
│   │   │           │   │   │   ├── strategy_options.cpython-312.pyc
│   │   │           │   │   │   ├── sync.cpython-312.pyc
│   │   │           │   │   │   ├── unitofwork.cpython-312.pyc
│   │   │           │   │   │   ├── util.cpython-312.pyc
│   │   │           │   │   │   └── writeonly.cpython-312.pyc
│   │   │           │   │   ├── _orm_constructors.py
│   │   │           │   │   ├── _typing.py
│   │   │           │   │   ├── attributes.py
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── bulk_persistence.py
│   │   │           │   │   ├── clsregistry.py
│   │   │           │   │   ├── collections.py
│   │   │           │   │   ├── context.py
│   │   │           │   │   ├── decl_api.py
│   │   │           │   │   ├── decl_base.py
│   │   │           │   │   ├── dependency.py
│   │   │           │   │   ├── descriptor_props.py
│   │   │           │   │   ├── dynamic.py
│   │   │           │   │   ├── evaluator.py
│   │   │           │   │   ├── events.py
│   │   │           │   │   ├── exc.py
│   │   │           │   │   ├── identity.py
│   │   │           │   │   ├── instrumentation.py
│   │   │           │   │   ├── interfaces.py
│   │   │           │   │   ├── loading.py
│   │   │           │   │   ├── mapped_collection.py
│   │   │           │   │   ├── mapper.py
│   │   │           │   │   ├── path_registry.py
│   │   │           │   │   ├── persistence.py
│   │   │           │   │   ├── properties.py
│   │   │           │   │   ├── query.py
│   │   │           │   │   ├── relationships.py
│   │   │           │   │   ├── scoping.py
│   │   │           │   │   ├── session.py
│   │   │           │   │   ├── state.py
│   │   │           │   │   ├── state_changes.py
│   │   │           │   │   ├── strategies.py
│   │   │           │   │   ├── strategy_options.py
│   │   │           │   │   ├── sync.py
│   │   │           │   │   ├── unitofwork.py
│   │   │           │   │   ├── util.py
│   │   │           │   │   └── writeonly.py
│   │   │           │   ├── pool
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── base.cpython-312.pyc
│   │   │           │   │   │   ├── events.cpython-312.pyc
│   │   │           │   │   │   └── impl.cpython-312.pyc
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── events.py
│   │   │           │   │   └── impl.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── schema.py
│   │   │           │   ├── sql
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── __pycache__
│   │   │           │   │   │   ├── __init__.cpython-312.pyc
│   │   │           │   │   │   ├── _dml_constructors.cpython-312.pyc
│   │   │           │   │   │   ├── _elements_constructors.cpython-312.pyc
│   │   │           │   │   │   ├── _orm_types.cpython-312.pyc
│   │   │           │   │   │   ├── _selectable_constructors.cpython-312.pyc
│   │   │           │   │   │   ├── _typing.cpython-312.pyc
│   │   │           │   │   │   ├── annotation.cpython-312.pyc
│   │   │           │   │   │   ├── base.cpython-312.pyc
│   │   │           │   │   │   ├── cache_key.cpython-312.pyc
│   │   │           │   │   │   ├── coercions.cpython-312.pyc
│   │   │           │   │   │   ├── compiler.cpython-312.pyc
│   │   │           │   │   │   ├── crud.cpython-312.pyc
│   │   │           │   │   │   ├── ddl.cpython-312.pyc
│   │   │           │   │   │   ├── default_comparator.cpython-312.pyc
│   │   │           │   │   │   ├── dml.cpython-312.pyc
│   │   │           │   │   │   ├── elements.cpython-312.pyc
│   │   │           │   │   │   ├── events.cpython-312.pyc
│   │   │           │   │   │   ├── expression.cpython-312.pyc
│   │   │           │   │   │   ├── functions.cpython-312.pyc
│   │   │           │   │   │   ├── lambdas.cpython-312.pyc
│   │   │           │   │   │   ├── naming.cpython-312.pyc
│   │   │           │   │   │   ├── operators.cpython-312.pyc
│   │   │           │   │   │   ├── roles.cpython-312.pyc
│   │   │           │   │   │   ├── schema.cpython-312.pyc
│   │   │           │   │   │   ├── selectable.cpython-312.pyc
│   │   │           │   │   │   ├── sqltypes.cpython-312.pyc
│   │   │           │   │   │   ├── traversals.cpython-312.pyc
│   │   │           │   │   │   ├── type_api.cpython-312.pyc
│   │   │           │   │   │   ├── util.cpython-312.pyc
│   │   │           │   │   │   └── visitors.cpython-312.pyc
│   │   │           │   │   ├── _dml_constructors.py
│   │   │           │   │   ├── _elements_constructors.py
│   │   │           │   │   ├── _orm_types.py
│   │   │           │   │   ├── _py_util.py
│   │   │           │   │   ├── _selectable_constructors.py
│   │   │           │   │   ├── _typing.py
│   │   │           │   │   ├── annotation.py
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── cache_key.py
│   │   │           │   │   ├── coercions.py
│   │   │           │   │   ├── compiler.py
│   │   │           │   │   ├── crud.py
│   │   │           │   │   ├── ddl.py
│   │   │           │   │   ├── default_comparator.py
│   │   │           │   │   ├── dml.py
│   │   │           │   │   ├── elements.py
│   │   │           │   │   ├── events.py
│   │   │           │   │   ├── expression.py
│   │   │           │   │   ├── functions.py
│   │   │           │   │   ├── lambdas.py
│   │   │           │   │   ├── naming.py
│   │   │           │   │   ├── operators.py
│   │   │           │   │   ├── roles.py
│   │   │           │   │   ├── schema.py
│   │   │           │   │   ├── selectable.py
│   │   │           │   │   ├── sqltypes.py
│   │   │           │   │   ├── traversals.py
│   │   │           │   │   ├── type_api.py
│   │   │           │   │   ├── util.py
│   │   │           │   │   └── visitors.py
│   │   │           │   ├── testing
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── assertions.py
│   │   │           │   │   ├── assertsql.py
│   │   │           │   │   ├── asyncio.py
│   │   │           │   │   ├── config.py
│   │   │           │   │   ├── engines.py
│   │   │           │   │   ├── entities.py
│   │   │           │   │   ├── exclusions.py
│   │   │           │   │   ├── fixtures
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   ├── base.py
│   │   │           │   │   │   ├── mypy.py
│   │   │           │   │   │   ├── orm.py
│   │   │           │   │   │   └── sql.py
│   │   │           │   │   ├── pickleable.py
│   │   │           │   │   ├── plugin
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   ├── bootstrap.py
│   │   │           │   │   │   ├── plugin_base.py
│   │   │           │   │   │   └── pytestplugin.py
│   │   │           │   │   ├── profiling.py
│   │   │           │   │   ├── provision.py
│   │   │           │   │   ├── requirements.py
│   │   │           │   │   ├── schema.py
│   │   │           │   │   ├── suite
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   ├── test_cte.py
│   │   │           │   │   │   ├── test_ddl.py
│   │   │           │   │   │   ├── test_deprecations.py
│   │   │           │   │   │   ├── test_dialect.py
│   │   │           │   │   │   ├── test_insert.py
│   │   │           │   │   │   ├── test_reflection.py
│   │   │           │   │   │   ├── test_results.py
│   │   │           │   │   │   ├── test_rowcount.py
│   │   │           │   │   │   ├── test_select.py
│   │   │           │   │   │   ├── test_sequence.py
│   │   │           │   │   │   ├── test_types.py
│   │   │           │   │   │   ├── test_unicode_ddl.py
│   │   │           │   │   │   └── test_update_delete.py
│   │   │           │   │   ├── util.py
│   │   │           │   │   └── warnings.py
│   │   │           │   ├── types.py
│   │   │           │   └── util
│   │   │           │       ├── __init__.py
│   │   │           │       ├── __pycache__
│   │   │           │       │   ├── __init__.cpython-312.pyc
│   │   │           │       │   ├── _collections.cpython-312.pyc
│   │   │           │       │   ├── _concurrency_py3k.cpython-312.pyc
│   │   │           │       │   ├── _has_cy.cpython-312.pyc
│   │   │           │       │   ├── compat.cpython-312.pyc
│   │   │           │       │   ├── concurrency.cpython-312.pyc
│   │   │           │       │   ├── deprecations.cpython-312.pyc
│   │   │           │       │   ├── langhelpers.cpython-312.pyc
│   │   │           │       │   ├── preloaded.cpython-312.pyc
│   │   │           │       │   ├── queue.cpython-312.pyc
│   │   │           │       │   ├── topological.cpython-312.pyc
│   │   │           │       │   └── typing.cpython-312.pyc
│   │   │           │       ├── _collections.py
│   │   │           │       ├── _concurrency_py3k.py
│   │   │           │       ├── _has_cy.py
│   │   │           │       ├── _py_collections.py
│   │   │           │       ├── compat.py
│   │   │           │       ├── concurrency.py
│   │   │           │       ├── deprecations.py
│   │   │           │       ├── langhelpers.py
│   │   │           │       ├── preloaded.py
│   │   │           │       ├── queue.py
│   │   │           │       ├── tool_support.py
│   │   │           │       ├── topological.py
│   │   │           │       └── typing.py
│   │   │           ├── starlette
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _exception_handler.py
│   │   │           │   ├── _utils.py
│   │   │           │   ├── applications.py
│   │   │           │   ├── authentication.py
│   │   │           │   ├── background.py
│   │   │           │   ├── concurrency.py
│   │   │           │   ├── config.py
│   │   │           │   ├── convertors.py
│   │   │           │   ├── datastructures.py
│   │   │           │   ├── endpoints.py
│   │   │           │   ├── exceptions.py
│   │   │           │   ├── formparsers.py
│   │   │           │   ├── middleware
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── authentication.py
│   │   │           │   │   ├── base.py
│   │   │           │   │   ├── cors.py
│   │   │           │   │   ├── errors.py
│   │   │           │   │   ├── exceptions.py
│   │   │           │   │   ├── gzip.py
│   │   │           │   │   ├── httpsredirect.py
│   │   │           │   │   ├── sessions.py
│   │   │           │   │   ├── trustedhost.py
│   │   │           │   │   └── wsgi.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── requests.py
│   │   │           │   ├── responses.py
│   │   │           │   ├── routing.py
│   │   │           │   ├── schemas.py
│   │   │           │   ├── staticfiles.py
│   │   │           │   ├── status.py
│   │   │           │   ├── templating.py
│   │   │           │   ├── testclient.py
│   │   │           │   ├── types.py
│   │   │           │   └── websockets.py
│   │   │           ├── starlette-0.45.3.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE.md
│   │   │           ├── typer
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __main__.py
│   │   │           │   ├── _completion_classes.py
│   │   │           │   ├── _completion_shared.py
│   │   │           │   ├── _typing.py
│   │   │           │   ├── cli.py
│   │   │           │   ├── colors.py
│   │   │           │   ├── completion.py
│   │   │           │   ├── core.py
│   │   │           │   ├── main.py
│   │   │           │   ├── models.py
│   │   │           │   ├── params.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── rich_utils.py
│   │   │           │   ├── testing.py
│   │   │           │   └── utils.py
│   │   │           ├── typer-0.15.1.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── entry_points.txt
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE
│   │   │           ├── typing_extensions-4.12.2.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   └── WHEEL
│   │   │           ├── typing_extensions.py
│   │   │           ├── ujson-5.10.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE.txt
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── top_level.txt
│   │   │           ├── ujson.cpython-312-x86_64-linux-gnu.so
│   │   │           ├── ujson.libs
│   │   │           ├── uvicorn
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __main__.py
│   │   │           │   ├── _subprocess.py
│   │   │           │   ├── _types.py
│   │   │           │   ├── config.py
│   │   │           │   ├── importer.py
│   │   │           │   ├── lifespan
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── off.py
│   │   │           │   │   └── on.py
│   │   │           │   ├── logging.py
│   │   │           │   ├── loops
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── asyncio.py
│   │   │           │   │   ├── auto.py
│   │   │           │   │   └── uvloop.py
│   │   │           │   ├── main.py
│   │   │           │   ├── middleware
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── asgi2.py
│   │   │           │   │   ├── message_logger.py
│   │   │           │   │   ├── proxy_headers.py
│   │   │           │   │   └── wsgi.py
│   │   │           │   ├── protocols
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── http
│   │   │           │   │   │   ├── __init__.py
│   │   │           │   │   │   ├── auto.py
│   │   │           │   │   │   ├── flow_control.py
│   │   │           │   │   │   ├── h11_impl.py
│   │   │           │   │   │   └── httptools_impl.py
│   │   │           │   │   ├── utils.py
│   │   │           │   │   └── websockets
│   │   │           │   │       ├── __init__.py
│   │   │           │   │       ├── auto.py
│   │   │           │   │       ├── websockets_impl.py
│   │   │           │   │       └── wsproto_impl.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── server.py
│   │   │           │   ├── supervisors
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── basereload.py
│   │   │           │   │   ├── multiprocess.py
│   │   │           │   │   ├── statreload.py
│   │   │           │   │   └── watchfilesreload.py
│   │   │           │   └── workers.py
│   │   │           ├── uvicorn-0.34.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── entry_points.txt
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE.md
│   │   │           ├── uvloop
│   │   │           │   ├── __init__.py
│   │   │           │   ├── _noop.py
│   │   │           │   ├── _testbase.py
│   │   │           │   ├── _version.py
│   │   │           │   ├── cbhandles.pxd
│   │   │           │   ├── cbhandles.pyx
│   │   │           │   ├── dns.pyx
│   │   │           │   ├── errors.pyx
│   │   │           │   ├── handles
│   │   │           │   │   ├── async_.pxd
│   │   │           │   │   ├── async_.pyx
│   │   │           │   │   ├── basetransport.pxd
│   │   │           │   │   ├── basetransport.pyx
│   │   │           │   │   ├── check.pxd
│   │   │           │   │   ├── check.pyx
│   │   │           │   │   ├── fsevent.pxd
│   │   │           │   │   ├── fsevent.pyx
│   │   │           │   │   ├── handle.pxd
│   │   │           │   │   ├── handle.pyx
│   │   │           │   │   ├── idle.pxd
│   │   │           │   │   ├── idle.pyx
│   │   │           │   │   ├── pipe.pxd
│   │   │           │   │   ├── pipe.pyx
│   │   │           │   │   ├── poll.pxd
│   │   │           │   │   ├── poll.pyx
│   │   │           │   │   ├── process.pxd
│   │   │           │   │   ├── process.pyx
│   │   │           │   │   ├── stream.pxd
│   │   │           │   │   ├── stream.pyx
│   │   │           │   │   ├── streamserver.pxd
│   │   │           │   │   ├── streamserver.pyx
│   │   │           │   │   ├── tcp.pxd
│   │   │           │   │   ├── tcp.pyx
│   │   │           │   │   ├── timer.pxd
│   │   │           │   │   ├── timer.pyx
│   │   │           │   │   ├── udp.pxd
│   │   │           │   │   └── udp.pyx
│   │   │           │   ├── includes
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── consts.pxi
│   │   │           │   │   ├── debug.pxd
│   │   │           │   │   ├── flowcontrol.pxd
│   │   │           │   │   ├── python.pxd
│   │   │           │   │   ├── stdlib.pxi
│   │   │           │   │   ├── system.pxd
│   │   │           │   │   └── uv.pxd
│   │   │           │   ├── loop.cpython-312-x86_64-linux-gnu.so
│   │   │           │   ├── loop.pxd
│   │   │           │   ├── loop.pyi
│   │   │           │   ├── loop.pyx
│   │   │           │   ├── lru.pyx
│   │   │           │   ├── pseudosock.pyx
│   │   │           │   ├── py.typed
│   │   │           │   ├── request.pxd
│   │   │           │   ├── request.pyx
│   │   │           │   ├── server.pxd
│   │   │           │   ├── server.pyx
│   │   │           │   ├── sslproto.pxd
│   │   │           │   └── sslproto.pyx
│   │   │           ├── uvloop-0.21.0.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE-APACHE
│   │   │           │   ├── LICENSE-MIT
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── top_level.txt
│   │   │           ├── watchfiles
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __main__.py
│   │   │           │   ├── _rust_notify.cpython-312-x86_64-linux-gnu.so
│   │   │           │   ├── _rust_notify.pyi
│   │   │           │   ├── cli.py
│   │   │           │   ├── filters.py
│   │   │           │   ├── main.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── run.py
│   │   │           │   └── version.py
│   │   │           ├── watchfiles-1.0.4.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   ├── entry_points.txt
│   │   │           │   └── licenses
│   │   │           │       └── LICENSE
│   │   │           ├── websockets
│   │   │           │   ├── __init__.py
│   │   │           │   ├── __main__.py
│   │   │           │   ├── asyncio
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── async_timeout.py
│   │   │           │   │   ├── client.py
│   │   │           │   │   ├── compatibility.py
│   │   │           │   │   ├── connection.py
│   │   │           │   │   ├── messages.py
│   │   │           │   │   └── server.py
│   │   │           │   ├── auth.py
│   │   │           │   ├── client.py
│   │   │           │   ├── connection.py
│   │   │           │   ├── datastructures.py
│   │   │           │   ├── exceptions.py
│   │   │           │   ├── extensions
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── base.py
│   │   │           │   │   └── permessage_deflate.py
│   │   │           │   ├── frames.py
│   │   │           │   ├── headers.py
│   │   │           │   ├── http.py
│   │   │           │   ├── http11.py
│   │   │           │   ├── imports.py
│   │   │           │   ├── legacy
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── auth.py
│   │   │           │   │   ├── client.py
│   │   │           │   │   ├── exceptions.py
│   │   │           │   │   ├── framing.py
│   │   │           │   │   ├── handshake.py
│   │   │           │   │   ├── http.py
│   │   │           │   │   ├── protocol.py
│   │   │           │   │   └── server.py
│   │   │           │   ├── protocol.py
│   │   │           │   ├── py.typed
│   │   │           │   ├── server.py
│   │   │           │   ├── speedups.c
│   │   │           │   ├── speedups.cpython-312-x86_64-linux-gnu.so
│   │   │           │   ├── speedups.pyi
│   │   │           │   ├── streams.py
│   │   │           │   ├── sync
│   │   │           │   │   ├── __init__.py
│   │   │           │   │   ├── client.py
│   │   │           │   │   ├── connection.py
│   │   │           │   │   ├── messages.py
│   │   │           │   │   ├── server.py
│   │   │           │   │   └── utils.py
│   │   │           │   ├── typing.py
│   │   │           │   ├── uri.py
│   │   │           │   ├── utils.py
│   │   │           │   └── version.py
│   │   │           ├── websockets-14.2.dist-info
│   │   │           │   ├── INSTALLER
│   │   │           │   ├── LICENSE
│   │   │           │   ├── METADATA
│   │   │           │   ├── RECORD
│   │   │           │   ├── REQUESTED
│   │   │           │   ├── WHEEL
│   │   │           │   └── top_level.txt
│   │   │           └── yaml
│   │   │               ├── __init__.py
│   │   │               ├── _yaml.cpython-312-x86_64-linux-gnu.so
│   │   │               ├── composer.py
│   │   │               ├── constructor.py
│   │   │               ├── cyaml.py
│   │   │               ├── dumper.py
│   │   │               ├── emitter.py
│   │   │               ├── error.py
│   │   │               ├── events.py
│   │   │               ├── loader.py
│   │   │               ├── nodes.py
│   │   │               ├── parser.py
│   │   │               ├── reader.py
│   │   │               ├── representer.py
│   │   │               ├── resolver.py
│   │   │               ├── scanner.py
│   │   │               ├── serializer.py
│   │   │               └── tokens.py
│   │   ├── lib64 -> lib
│   │   └── pyvenv.cfg
│   ├── alembic
│   │   ├── README.md
│   │   ├── __pycache__
│   │   │   └── env.cpython-312.pyc
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions
│   │       ├── 20250213_2020_be4ef40d2c7f_initial_migration_create_all_tables.py
│   │       └── __pycache__
│   │           └── 20250213_2020_be4ef40d2c7f_initial_migration_create_all_tables.cpython-312.pyc
│   ├── alembic.ini
│   ├── app
│   │   ├── __pycache__
│   │   │   └── main.cpython-312.pyc
│   │   ├── api
│   │   │   └── v1
│   │   │       ├── __pycache__
│   │   │       │   └── router.cpython-312.pyc
│   │   │       ├── endpoints
│   │   │       │   ├── __pycache__
│   │   │       │   │   ├── groups.cpython-312.pyc
│   │   │       │   │   ├── study_sessions.cpython-312.pyc
│   │   │       │   │   └── words.cpython-312.pyc
│   │   │       │   ├── groups.py
│   │   │       │   ├── study_sessions.py
│   │   │       │   └── words.py
│   │   │       └── router.py
│   │   ├── core
│   │   │   ├── __pycache__
│   │   │   │   ├── config.cpython-312.pyc
│   │   │   │   ├── database.cpython-312.pyc
│   │   │   │   └── exceptions.cpython-312.pyc
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── exceptions.py
│   │   ├── crud
│   │   │   ├── __pycache__
│   │   │   │   ├── base.cpython-312.pyc
│   │   │   │   ├── group.cpython-312.pyc
│   │   │   │   ├── study_session.cpython-312.pyc
│   │   │   │   └── word.cpython-312.pyc
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── study_session.py
│   │   │   └── word.py
│   │   ├── main.py
│   │   ├── models
│   │   │   ├── __pycache__
│   │   │   │   ├── base.cpython-312.pyc
│   │   │   │   ├── group.cpython-312.pyc
│   │   │   │   ├── study_activity.cpython-312.pyc
│   │   │   │   ├── study_session.cpython-312.pyc
│   │   │   │   ├── word.cpython-312.pyc
│   │   │   │   ├── word_group.cpython-312.pyc
│   │   │   │   └── word_review_item.cpython-312.pyc
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── study_activity.py
│   │   │   ├── study_session.py
│   │   │   ├── word.py
│   │   │   ├── word_group.py
│   │   │   └── word_review_item.py
│   │   ├── schemas
│   │   │   ├── __pycache__
│   │   │   │   ├── base.cpython-312.pyc
│   │   │   │   ├── group.cpython-312.pyc
│   │   │   │   ├── study_session.cpython-312.pyc
│   │   │   │   └── word.cpython-312.pyc
│   │   │   ├── base.py
│   │   │   ├── group.py
│   │   │   ├── study_session.py
│   │   │   └── word.py
│   │   └── services
│   │       ├── __pycache__
│   │       │   ├── group_service.cpython-312.pyc
│   │       │   ├── study_service.cpython-312.pyc
│   │       │   └── word_service.cpython-312.pyc
│   │       ├── group_service.py
│   │       ├── study_service.py
│   │       └── word_service.py
│   ├── htmlcov
│   │   ├── .gitignore
│   │   ├── class_index.html
│   │   ├── coverage_html_cb_6fb7b396.js
│   │   ├── favicon_32_cb_58284776.png
│   │   ├── function_index.html
│   │   ├── index.html
│   │   ├── keybd_closed_cb_ce680311.png
│   │   ├── status.json
│   │   ├── style_cb_8e611ae1.css
│   │   ├── z_257b53c25398f6ee_router_py.html
│   │   ├── z_41f09dac0431399d_groups_py.html
│   │   ├── z_41f09dac0431399d_study_sessions_py.html
│   │   ├── z_41f09dac0431399d_words_py.html
│   │   ├── z_5f5a17c013354698_main_py.html
│   │   ├── z_6c0e4b930745278b_base_py.html
│   │   ├── z_6c0e4b930745278b_group_py.html
│   │   ├── z_6c0e4b930745278b_study_activity_py.html
│   │   ├── z_6c0e4b930745278b_study_session_py.html
│   │   ├── z_6c0e4b930745278b_word_group_py.html
│   │   ├── z_6c0e4b930745278b_word_py.html
│   │   ├── z_6c0e4b930745278b_word_review_item_py.html
│   │   ├── z_8f7e1016f2d37417_config_py.html
│   │   ├── z_8f7e1016f2d37417_database_py.html
│   │   ├── z_8f7e1016f2d37417_exceptions_py.html
│   │   ├── z_c0f67d75e686303c_base_py.html
│   │   ├── z_c0f67d75e686303c_group_py.html
│   │   ├── z_c0f67d75e686303c_study_session_py.html
│   │   ├── z_c0f67d75e686303c_word_py.html
│   │   ├── z_c318f3fa19a49f69_group_service_py.html
│   │   ├── z_c318f3fa19a49f69_study_service_py.html
│   │   ├── z_c318f3fa19a49f69_word_service_py.html
│   │   ├── z_e2405abfd7b16e4b_base_py.html
│   │   ├── z_e2405abfd7b16e4b_group_py.html
│   │   ├── z_e2405abfd7b16e4b_study_session_py.html
│   │   └── z_e2405abfd7b16e4b_word_py.html
│   ├── pyproject.toml
│   ├── seed
│   │   ├── groups.json
│   │   ├── study_activities.json
│   │   ├── word_groups.json
│   │   ├── words.adjectives.json
│   │   └── words.verbs.json
│   ├── sql
│   ├── tests
│   │   ├── __pycache__
│   │   │   └── conftest.cpython-312-pytest-8.3.4.pyc
│   │   ├── conftest.py
│   │   ├── fixtures
│   │   │   ├── __pycache__
│   │   │   │   └── test_data.cpython-312-pytest-8.3.4.pyc
│   │   │   └── test_data.py
│   │   ├── test_api
│   │   │   └── test_v1
│   │   │       ├── __pycache__
│   │   │       │   └── test_words.cpython-312-pytest-8.3.4.pyc
│   │   │       └── test_words.py
│   │   └── test_crud
│   │       ├── __pycache__
│   │       │   └── test_word_crud.cpython-312-pytest-8.3.4.pyc
│   │       └── test_word_crud.py
│   └── uv.lock
├── data
├── docs
│   ├── AI-TODO.md
│   ├── Backend-Technical-Spec.md
│   ├── Frontend-Technical-Spec.md
│   ├── Project-File-Structure.md
│   └── Tasks-Technical-Spec.md
├── frontend-react
│   └── .gitkeep
└── scripts
    └── db
        ├── __pycache__
        │   └── init_db.cpython-312.pyc
        ├── init_db.py
        └── seed_db.py

340 directories, 3257 files
